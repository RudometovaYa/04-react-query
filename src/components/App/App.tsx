import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import Pagination from "../Pagination/Pagination";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", topic, currentPage],
    queryFn: () => fetchMovies(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const closeModal = () => {
    setSelectedMovie(null);
  };

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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid
          movies={data.results}
          onSelect={(movie) => {
            setSelectedMovie(movie);
          }}
        />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
