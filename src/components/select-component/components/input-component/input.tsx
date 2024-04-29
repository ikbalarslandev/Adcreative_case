import { FaCaretDown } from "react-icons/fa";
import { IResult } from "../../../../types";

interface InputComponentProps {
  setPageQuery: (page: number | ((prev: number) => number)) => void;
  setLocalCacheData: React.Dispatch<React.SetStateAction<IResult[]>>;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputComponent = ({
  setPageQuery,
  setLocalCacheData,
  searchParams,
  setSearchParams,
  selectedNames,
  setSelectedNames,
  isOpen,
  setIsOpen,
}: InputComponentProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageQuery(1);
    setLocalCacheData([]);

    if (e.target.value === "") {
      searchParams.delete("name");
      setSearchParams(searchParams);
    } else {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("name", e.target.value);
      setSearchParams(newSearchParams);
    }
  };

  return (
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
                setSelectedNames(selectedNames.filter((item) => item !== name))
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
  );
};

export default InputComponent;
