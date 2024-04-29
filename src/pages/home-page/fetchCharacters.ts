import { QueryFunction } from "@tanstack/react-query";
import { request } from "../../services/axios";
import { IQueryData } from "../../types";

const fetchCharacters: QueryFunction<IQueryData> = async ({ queryKey }) => {
  const nameQuery = queryKey[1] || "";
  const pageQuery = queryKey[2] || "";

  const query = `?name=${nameQuery}&page=${pageQuery}`;

  try {
    const response = await request({
      type: "get",
      endpoint: `character${query}`,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Error fetching all characters: " + error);
  }
};

export { fetchCharacters };
