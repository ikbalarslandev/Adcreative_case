import { UseQueryResult } from "@tanstack/react-query";
import { IQueryData } from "../../types";
import { useSearchParams } from "react-router-dom";

const SelectComponent: React.FC<{ queryData: UseQueryResult<IQueryData> }> = ({
  queryData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ name: e.target.value });
  };

  return (
    <div>
      {queryData.data?.info?.count}
      <input
        type="text"
        className="border-2"
        value={searchParams.get("name") || ""}
        onChange={handleInputChange}
        placeholder="Enter query..."
      />
    </div>
  );
};

export default SelectComponent;
