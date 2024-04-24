interface IQueryData {
  searchParams: URLSearchParams;
}

const getApiQuery = ({ searchParams }: IQueryData) => {
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
