import React, { useRef, useEffect } from "react";
import { debounce } from "lodash";
import { IQueryData, IResult } from "../../../../../../types";
import { UseQueryResult } from "@tanstack/react-query";

interface DropdownWrapperProps {
  children: React.ReactNode;
  queryData: UseQueryResult<IQueryData>;

  setPageQuery: (page: number | ((prev: number) => number)) => void;

  maxPage: number;
  setMaxPage: (maxPage: number) => void;

  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;

  localCacheData: IResult[];
  setLocalCacheData: (
    prev: ((prev: IResult[]) => IResult[]) | IResult[]
  ) => void;
}

const DropdownWrapper = ({
  children,
  queryData,
  maxPage,
  setMaxPage,
  isFetching,
  setPageQuery,
  setIsFetching,
  localCacheData,
  setLocalCacheData,
}: DropdownWrapperProps) => {
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
      const newResults = queryData.data.results.filter(
        (result) => !localCacheData.some((item) => item.id === result.id)
      );

      if (newResults.length > 0) {
        setLocalCacheData((prevData) => [...prevData, ...newResults]);
      }
    }

    if (dropdownRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
      const scrollPosition = scrollTop + clientHeight;
      setIsFetching(false);
      if (scrollPosition < scrollHeight) {
        dropdownRef.current.scrollTo({ top: scrollPosition });
      }
    }
  }, [queryData.data]);

  return (
    <ul
      ref={dropdownRef}
      className="border  border-gray-700 rounded-xl mt-2 overflow-y-auto max-h-80 md:w-[30rem] w-full absolute bg-white "
    >
      {children}
    </ul>
  );
};

export default DropdownWrapper;
