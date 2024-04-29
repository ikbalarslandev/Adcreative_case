import { IQueryData, IResult } from "../../../../types";
import { UseQueryResult } from "@tanstack/react-query";
import DropdownItem from "./components/dropdown-item-component/intex";
import DropdownWrapper from "./components/infinite-scroll-component";
import LoadingItem from "./components/loading-compnent";

interface DropdownComponentProps {
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
  selectedNames: string[];
  setSelectedNames: (selectedNames: string[]) => void;
  isOpen: boolean;
  searchParams: URLSearchParams;
}

const DropdownComponent = ({
  queryData,
  setPageQuery,
  maxPage,
  setMaxPage,
  isFetching,
  setIsFetching,
  localCacheData,
  setLocalCacheData,
  selectedNames,
  setSelectedNames,
  isOpen,
  searchParams,
}: DropdownComponentProps) => {
  return (
    <DropdownWrapper
      queryData={queryData}
      maxPage={maxPage}
      setMaxPage={setMaxPage}
      isFetching={isFetching}
      setPageQuery={setPageQuery}
      setIsFetching={setIsFetching}
      localCacheData={localCacheData}
      setLocalCacheData={setLocalCacheData}
    >
      {queryData.isLoading ? (
        [...Array(7)].map((_, i) => <LoadingItem key={i} />)
      ) : queryData.error ? (
        <li className="border-y px-3 py-2 flex gap-3 items-center justify-start w-full cursor-pointer">
          <p>Couldn't find any data</p>
        </li>
      ) : (
        localCacheData?.map((result) => (
          <DropdownItem
            key={result.id}
            result={result}
            selectedNames={selectedNames}
            searchParams={searchParams}
            isOpen={isOpen}
            setSelectedNames={setSelectedNames}
          />
        ))
      )}
    </DropdownWrapper>
  );
};

export default DropdownComponent;
