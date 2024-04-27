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
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ name: e.target.value });
  };
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
              className="border-y  px-3 py-2 flex gap-3  items-center justify-start cursor-pointer "
              onClick={() => handleCheckboxChange(result.name)}
            >
              <input
                type="checkbox"
                checked={selectedNames.includes(result.name)}
                onChange={() => handleCheckboxChange(result.name)}
              />
              <img
                src={result.image}
                className="w-8 h-8 rounded-lg"
                alt="character image"
              />
              <div>
                <p>
                  {searchParams.get("name")
                    ? makeSearchBold(result.name)
                    : result.name}
                </p>
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
