import { useEffect } from "react";

interface IQueryData {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}

const getApiQuery = ({ searchParams, setSearchParams }: IQueryData) => {
  //remove  from searchParams if it is empty
  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    searchParams.forEach((value, key) => {
      if (value === "") {
        updatedSearchParams.delete(key);
      }
    });
    setSearchParams(updatedSearchParams);
  }, [searchParams, setSearchParams]);

  const name = searchParams.get("name");
  const page = searchParams.get("page");
  let apiQuery = "";

  if (name && page) {
    apiQuery = `?name=${name}&page=${page}`;
  } else if (name) {
    apiQuery = `?name=${name}`;
  } else if (page) {
    apiQuery = `?page=${page}`;
  }

  return apiQuery;
};

export { getApiQuery };
