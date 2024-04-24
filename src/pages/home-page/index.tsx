import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "./fetchCharacters";
import { useSearchParams } from "react-router-dom";
import { getApiQuery } from "./getApiQuery";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const apiQuery = getApiQuery({ searchParams });

  const queryData = useQuery({
    queryKey: ["characters_data", apiQuery],
    queryFn: fetchCharacters,
    staleTime: Infinity,
  });

  if (queryData.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="border w-full h-full">Home Page</h1>
    </div>
  );
};

export default HomePage;
