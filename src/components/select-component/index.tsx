import { UseQueryResult } from "@tanstack/react-query";
import { IQueryData } from "../../types";
import { useSearchParams } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import React, { useState } from "react";

const SelectComponent: React.FC<{ queryData: UseQueryResult<IQueryData> }> = ({
  queryData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ name: e.target.value });
  };

  return (
    <div className="flex flex-col gap-1 text-gray-500">
      {queryData.data?.info?.count || 0}
      {/* input */}
      <div className="flex border p-1 rounded-xl w-[20rem] border-gray-700   ">
        <input
          type="text"
          className=" focus:ring-0 focus:outline-none w-full rounded-lg h-10 min-w-14"
          value={searchParams.get("name") || ""}
          onChange={handleInputChange}
          placeholder="Enter query..."
          onClick={() => setIsOpen(!isOpen)}
        />
        <FaCaretDown
          className="self-center mr-1"
          size={22}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {/* drop down */}
      {isOpen && (
        <div className="border   border-gray-700 rounded-xl mt-2 overflow-y-auto   max-h-80 w-[20rem] ">
          {queryData.data?.results.map((result) => (
            <div
              key={result.id}
              className="border-y  px-3 py-2 flex gap-3  items-center justify-start "
            >
              <input type="checkbox" />
              <img
                src={result.image}
                className="w-8 h-8 rounded-lg"
                alt="character image"
              />
              <div>
                <p>{result.name}</p>
                <p className="text-sm text-gray-500 ">
                  {result.episode.length} Episodes
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
