import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", topic, currentPage],
    queryFn: () => fetchMovies(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const totalPage = data?.total_pages ?? 0;

  const handelFormSubmit = (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handelFormSubmit} />

      {isSuccess && (
        <Pagination
          page={currentPage}
          totalPages={totalPage}
          setPage={setCurrentPage}
        />
      )}
      {isLoading && <strong>Loading articles...</strong>}
      {isError && <strong>Oops, there was an error...</strong>}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
          onSelect={(movie) => {
            console.log("Selected movie:", movie);
          }}
        />
      )}
    </>
  );
}
