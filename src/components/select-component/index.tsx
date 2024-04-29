import { UseQueryResult } from "@tanstack/react-query";
import { IQueryData, IResult } from "../../types";
import { useSearchParams } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import LoadingItem from "./components/loading";

interface ISelectComponentProps {
  queryData: UseQueryResult<IQueryData>;
  setPageQuery: (page: number | ((prev: number) => number)) => void;
}

const SelectComponent: React.FC<ISelectComponentProps> = ({
  queryData,
  setPageQuery,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [localCacheData, setLocalCacheData] = useState<IResult[]>([]);
  const [maxPage, setMaxPage] = useState<number>(0);
  const containerRef = useRef(null);

  //dropdown menu logic
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      let activeElement = document.activeElement as HTMLElement;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          const nextElement =
            activeElement.nextElementSibling as HTMLElement | null;
          if (nextElement) {
            nextElement.focus();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          const previousElement =
            activeElement.previousElementSibling as HTMLElement | null;
          if (previousElement) {
            previousElement.focus();
          }
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  const handleCheckboxChange = (name: string) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((item) => item !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };
  const makeSearchBold = (text: string) => {
    const index = text
      .toLowerCase()
      .indexOf(searchParams.get("name")?.toLowerCase() || "");
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <span className="font-bold">
          {text.slice(index, index + searchParams.get("name")!.length)}
        </span>
        {text.slice(index + searchParams.get("name")!.length)}
      </>
    );
  };

  // search input logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageQuery(1);
    setLocalCacheData([]);

    if (e.target.value === "") {
      searchParams.delete("name");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ name: e.target.value });
    }
  };

  // infinite scroll logic
  const dropdownRef = useRef<HTMLUListElement>(null);
  const debounceScroll = useRef(
    debounce(() => {
      if (!dropdownRef.current || isFetching) return;
      const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;

      const scrolledFromTop = scrollTop + clientHeight;

      const totalHeight = scrollHeight;

      const threshold = totalHeight * 0.8;

      if (scrolledFromTop >= threshold) {
        setPageQuery((prev) => prev + 1);
        setIsFetching(true);
      }
    }, 200)
  );

  useEffect(() => {
    if (localCacheData.length / 20 + 1 > maxPage) return;

    const dropdownElement = dropdownRef.current;
    if (dropdownElement) {
      dropdownElement.addEventListener("scroll", debounceScroll.current);
    }

    return () => {
      if (dropdownElement) {
        dropdownElement.removeEventListener("scroll", debounceScroll.current);
      }
    };
  }, [localCacheData, maxPage]);

  useEffect(() => {
    if (queryData.data?.info?.pages) {
      setMaxPage(queryData.data.info.pages);
    }

    if (queryData.data?.results) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current!;
      const scrollPosition = scrollTop + clientHeight;
      setLocalCacheData((prevData) => [...prevData, ...queryData.data.results]);
      setIsFetching(false);
      if (scrollPosition < scrollHeight) {
        dropdownRef.current?.scrollTo({ top: scrollPosition });
      }
    }
  }, [queryData.data]);

  const [isFetching, setIsFetching] = useState(false);

  return (
    <div className="flex flex-col gap-1 text-gray-500">
      <div className=" flex items-center justify-center mb-10  ">
        <p className="bg-white px-2 py-1 rounded-lg  ">
          <span className="text-black">
            {queryData.data?.info?.count ?? "000"} {"  "}
          </span>{" "}
          Results Found
        </p>
      </div>

      <div className="relative" ref={containerRef}>
        {/* input */}
        <div
          className="flex border p-1 rounded-xl md:w-[30rem]  border-gray-700 bg-white"
          onFocus={() => setIsOpen(true)}
        >
          <div className="flex flex-wrap gap-1 mr-1  ">
            {selectedNames.map((name) => (
              <div
                key={name}
                className="bg-gray-300/70 text-black  px-2 py-1 rounded-lg  flex items-center gap-2 justify-center"
              >
                <p>{name}</p>
                <button
                  onClick={() =>
                    setSelectedNames(
                      selectedNames.filter((item) => item !== name)
                    )
                  }
                  className="bg-gray-600/50 text-white px-[.4rem] rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className="flex  flex-1 items-center min-w-36 ">
            <input
              type="text"
              className=" focus:ring-0 focus:outline-none w-full rounded-lg h-10 text-black "
              value={searchParams.get("name") || ""}
              onChange={handleInputChange}
              placeholder="Search by name ..."
              onClick={() => setIsOpen(!isOpen)}
            />
            <FaCaretDown
              className="self-center mr-1"
              size={22}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        {/* drop down */}
        {isOpen && (
          <ul
            ref={dropdownRef}
            className="border  border-gray-700 rounded-xl mt-2 overflow-y-auto max-h-80 md:w-[30rem] w-full absolute bg-white "
          >
            {queryData.isLoading ? (
              [...Array(7)].map((_, i) => <LoadingItem key={i} />)
            ) : queryData.error ? (
              <li className="border-y px-3 py-2 flex gap-3 items-center justify-start w-full cursor-pointer">
                <p>Couldn't find any data</p>
              </li>
            ) : (
              localCacheData?.map((result) => (
                <li
                  key={result.id}
                  className="border-y border-gray-300 px-3 py-2 flex gap-3 items-center justify-start w-full cursor-pointer"
                  tabIndex={0}
                  onClick={() => handleCheckboxChange(result.name)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      handleCheckboxChange(result.name);
                      e.preventDefault();
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedNames.includes(result.name)}
                    onChange={() => handleCheckboxChange(result.name)}
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <img
                    src={result.image}
                    className="w-8 h-8 rounded-lg"
                    alt="character image"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <p>
                      {searchParams.get("name")
                        ? makeSearchBold(result.name)
                        : result.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {result.episode.length} Episodes
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectComponent;
