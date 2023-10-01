import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PopularMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  /*film populaire */
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMoviesList(json.results))
      .catch((err) => setMoviesList("error:" + err));
  }, []);

  return (
    <div>
      {moviesList.map((movie) => (
        <Link to={`/movie/${movie.id}`}>
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
          />
        </Link>
      ))}
    </div>
  );
}
