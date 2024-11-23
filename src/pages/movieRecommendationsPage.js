import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage"
import { getSimilarMovies } from "../api/tmdb-api";

import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";


const SimilarMoviesPage = () => {
    const { id } = useParams();
  
    const { data, error, isLoading, isError } = useQuery( //param key
      ["similar", { id }],
      () => getSimilarMovies(id),
      { enabled: !!id,}
    );
    if (isLoading) return <Spinner />;
    const similarMovies = (data?.results || []).slice(0, 3);
  

    return (
        <PageTemplate
          title="Top 3 movies"
          movies={similarMovies}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />);
    };
  export default SimilarMoviesPage;