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
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const totalPage = data?.total_pages ?? 0;

  const handleFormSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (isSuccess && data && data.results.length === 0) {
      toast.error("No movies found for your search.");
    }
  }, [isSuccess, data]);

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />

      {isSuccess && (data.results.length > 0 || totalPage > 1) && (
        <Pagination
          pageCount={totalPage}
          forcePage={currentPage}
          onPageChange={setCurrentPage}
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
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
