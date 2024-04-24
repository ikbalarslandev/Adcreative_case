import { QueryFunction } from "@tanstack/react-query";
import { request } from "../../services/axios";
import { IQueryData } from "../../types";

const fetchCharacters: QueryFunction<IQueryData> = async ({ queryKey }) => {
  const queryParams = queryKey[1];

  try {
    const response = await request({
      type: "get",
      endpoint: `character${queryParams}`,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Error fetching all characters: " + error);
  }
};

export { fetchCharacters };
