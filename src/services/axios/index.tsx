import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const request = (credentials: {
  type: "get" | "post" | "put" | "delete";
  endpoint: string;
}) => {
  return axiosInstance[credentials.type](`/${credentials.endpoint}`);
};

export { request };
