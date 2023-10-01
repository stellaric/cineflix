import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
export default function Search() {
  const [searchMoviesList, setSearchMoviesList] = useState([]);
  const [searchFullScreen, setSearchFullScreen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  /*_____________________________fullscreen search ______________________________*/
  const openSearch = () => {
    setSearchFullScreen(true);
  };

  const closeSearch = () => {
    setSearchFullScreen(false);
  };

  /*_____________________________fonction recherche ______________________________*/
  
  const apiKey = process.env.REACT_APP_API_KEY;
  //lien pour récupérer les données des films
  const urlSearch =
    "https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&page=1";
  //lien pour avoir accés à l'api
  const optionsSearch = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  // fonction permettant de gérer la recherche de films
  const handleSearch = (e) => {
    // empêcher la soumission par défaut du formulaire
    e.preventDefault();
    // construire l'URL de recherche en utilisant la variable searchInput
    const searchUrl = `${urlSearch}&query=${searchInput}`;

    fetch(searchUrl, optionsSearch) // effectuer une requête en utilisant fetch
      .then((res) => res.json()) // convertir la réponse en JSON
      .then((json) => setSearchMoviesList(json.results)) // mettre à jour la liste de films de recherche
      .catch((err) =>
        console.error("Erreur lors de la recherche de films:", err)
      ); // afficher une erreur dans la console en cas d'échec
  };

  return (
<div className="search">

  {/* Bouton pour ouvrir la barre de recherche */}
  <button className="openBtn" onClick={openSearch}>
    <iconify-icon icon="ri:search-line" />
  </button>

  {/* Barre de recherche en plein écran */}
  {searchFullScreen && (
    <div className="overlay">
      {/* Bouton pour fermer la barre de recherche */}
      <span
        className="closebtn"
        onClick={closeSearch}
        title="Close Overlay"
      >
        &times;
      </span>

      {/* Contenu de la barre de recherche */}
      <div className="overlay-content">
        {/* Formulaire de recherche */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">
            <iconify-icon icon="ri:search-line" />
          </button>
        </form>

        {/* Liste des résultats de recherche */}
        <div className="col_result">
          {searchMoviesList.map((movie) => (
            <div className="content_result">
              <Link to={`/movie/${movie.id}`}>
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`Poster for ${movie.title}`}
                />
              </Link>
              <h2>${movie.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>
 )}