import { UseQueryResult } from "@tanstack/react-query";
import { IQueryData, IResult } from "../../types";
import { useSearchParams } from "react-router-dom";
import React, { useState, useRef } from "react";
import InputComponent from "./components/input-component/input";
import DropdownComponent from "./components/dropdown-componnent";

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
  const [isFetching, setIsFetching] = useState(false);
  const [maxPage, setMaxPage] = useState<number>(0);
  const containerRef = useRef(null);

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
        <InputComponent
          setPageQuery={setPageQuery}
          setLocalCacheData={setLocalCacheData}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          selectedNames={selectedNames}
          setSelectedNames={setSelectedNames}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {isOpen && (
          <DropdownComponent
            queryData={queryData}
            setPageQuery={setPageQuery}
            maxPage={maxPage}
            setMaxPage={setMaxPage}
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            localCacheData={localCacheData}
            setLocalCacheData={setLocalCacheData}
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
            isOpen={isOpen}
            searchParams={searchParams}
          />
        )}
      </div>
    </div>
  );
};

export default SelectComponent;
