import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Main() {
  const { id } = useParams();
  const [moviesDetails, setMoviesDetails] = useState({});
  const [videoKey, setVideoKey] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };
    fetch(urlDetails, options)
      .then((res) => res.json())
      .then((data) => {
        setMoviesDetails(data);

        const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

        fetch(urlVideos, options)
          .then((res) => res.json())
          .then((videoData) => {
            const trailer = videoData.results.find(
              (video) => video.type === "Trailer"
            );

            if (trailer) {
              setVideoKey(trailer.key);
            }
          })
          .catch((err) =>
            console.error("Erreur lors de la récupération de la vidéo:", err)
          );
      })
      .catch((err) =>
        console.error(
          "Erreur lors de la récupération des détails du film:",
          err
        )
      );
  }, [id]);

  const [actors, setActors] = useState([]);

  // Effectuez une requête pour obtenir les acteurs lorsque le composant est monté.
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setActors(data.cast);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des acteurs :", err)
      );
  }, [id]);

  const [reviews, setReviews] = useState([]);

  // Effectuez une requête pour obtenir les critiques lorsque le composant est monté.
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.results);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des critiques :", err)
      );
  }, [id]);

  const [recommendations, setRecommendations] = useState([]);

  // Effectuez une requête pour obtenir les recommandations lorsque le composant est monté.
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.results);
      })
      .catch((err) =>
        console.error(
          "Erreur lors de la récupération des recommandations :",
          err
        )
      );
  }, [id]);

  console.log(moviesDetails);
  return (
    <main className="main_detail">
      <div className="gauche">
        <div key={moviesDetails.id}>
          <img
            key={moviesDetails.poster_path}
            alt={moviesDetails.title}
            src={`https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`}
          />
        </div>
      </div>
      <div className="droite">
        {videoKey && (
          <iframe
            id="video_detail"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Bande-annonce"
            allowFullScreen
          />
        )}
        <div className="text_detail">
          <h2>{moviesDetails.title}</h2>
          <p>{moviesDetails.overview}</p>
          <p>{moviesDetails.actor}</p>
        </div>

        {/* Affichage des autres détails du film */}

        <>
          <h2>Acteurs :</h2>
          <ul>
            {actors.map((actor) => (
              <li key="{actor.id}">{actor.name}</li>
            ))}
          </ul>
        </>

        <>
          <h2>Critiques :</h2>
          <ul>
            {reviews.map((review) => (
              <li key="{review.id}">
                <p>Auteur : {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>

        <>
          <h2>Recommandations :</h2>

          {recommendations.map((recommendation) => (
            <div className="content_recommendation" key={recommendation.id}>
              <Link to={`/movie/${recommendation.id}`}>
                <img
                  key={recommendation.poster_path}
                  alt={recommendation.title}
                  src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                />

                <p>Titre : {recommendation.title}</p>
              </Link>
            </div>
          ))}
        </>
      </div>
    </main>
  );
}
