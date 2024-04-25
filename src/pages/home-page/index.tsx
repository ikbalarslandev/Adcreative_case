import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "./fetchCharacters";
import { useSearchParams } from "react-router-dom";
import { getApiQuery } from "./getApiQuery";
import SelectComponent from "../../components/select-component";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const apiQuery = getApiQuery({ searchParams, setSearchParams });

  const queryData = useQuery({
    queryKey: ["characters_data", apiQuery],
    queryFn: fetchCharacters,
    staleTime: Infinity,
  });

  return (
    <div>
      <SelectComponent queryData={queryData} />
    </div>
  );
};

export default HomePage;
