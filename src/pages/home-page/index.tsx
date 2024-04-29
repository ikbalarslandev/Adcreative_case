import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "./fetchCharacters";
import { useSearchParams } from "react-router-dom";
import SelectComponent from "../../components/select-component";
import { useState } from "react";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const nameQuery = searchParams.get("name") || "";

  const [pageQuery, setPageQuery] = useState(1);

  const queryData = useQuery({
    queryKey: ["characters_data", nameQuery, pageQuery],
    queryFn: fetchCharacters,
    staleTime: Infinity,
  });

  return (
    <div>
      <SelectComponent queryData={queryData} setPageQuery={setPageQuery} />
    </div>
  );
};

export default HomePage;
