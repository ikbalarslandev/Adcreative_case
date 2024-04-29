export interface IQueryData {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: IResult[];
}

export interface IResult {
  id: number;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}
