import { IResult } from "../../../../../../types";
import { useEffect } from "react";

interface DropdownItemProps {
  result: IResult;
  selectedNames: string[];
  searchParams: URLSearchParams;
  isOpen: boolean;
  setSelectedNames: (selectedNames: string[]) => void;
}

const DropdownItem = ({
  result,
  selectedNames,
  searchParams,
  isOpen,
  setSelectedNames,
}: DropdownItemProps) => {
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

  return (
    <li
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
          {searchParams.get("name") ? makeSearchBold(result.name) : result.name}
        </p>
        <p className="text-sm text-gray-500">
          {result.episode.length} Episodes
        </p>
      </div>
    </li>
  );
};

export default DropdownItem;
