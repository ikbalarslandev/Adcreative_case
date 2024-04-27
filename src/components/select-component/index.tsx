import { UseQueryResult } from "@tanstack/react-query";
import { IQueryData } from "../../types";
import { useSearchParams } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const SelectComponent: React.FC<{ queryData: UseQueryResult<IQueryData> }> = ({
  queryData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ name: e.target.value });
  };

  return (
    <div className="flex flex-col gap-1 text-gray-500">
      {queryData.data?.info?.count || 0}

      <div className="flex border p-1 rounded-xl w-[20rem] border-gray-700   ">
        <input
          type="text"
          className=" focus:ring-0 focus:outline-none w-full rounded-lg h-10 min-w-14"
          value={searchParams.get("name") || ""}
          onChange={handleInputChange}
          placeholder="Enter query..."
        />
        <FaCaretDown className="self-center mr-1" size={22} />
      </div>
    </div>
  );
};

export default SelectComponent;
