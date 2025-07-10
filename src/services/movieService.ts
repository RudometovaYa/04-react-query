import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface MoviesHttpResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

console.log("API TOKEN:", API_TOKEN);

export const fetchMovies = async (
  topic: string,
  page: number = 1
): Promise<MoviesHttpResponse> => {
  const response = await axios.get<MoviesHttpResponse>(`/search/movie`, {
    params: {
      query: topic,
      page,
    },
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};
