import { IResult } from "../../../../../../types";
import { useEffect, useRef } from "react";

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
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const listItem = listItemRef.current;
      if (!listItem) return;

      const listItems = Array.from(
        listItem.parentElement?.querySelectorAll("li") || []
      );
      const currentIndex = listItems.indexOf(listItem);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < listItems.length - 1) {
            listItems[currentIndex + 1].focus();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            listItems[currentIndex - 1].focus();
          }
          break;

        default:
          break;
      }
    };

    listItemRef.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      listItemRef.current?.removeEventListener("keydown", handleKeyDown);
    };
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
      ref={listItemRef}
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
