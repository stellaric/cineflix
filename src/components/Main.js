import React from 'react'
import "../App.css";
import './Header'
import PopularMovies from "./PopularMovies";

function Main() {
  
  return(
    <main className="main">
       <div className="list">
    <h2>Films Populaires</h2>
  <PopularMovies/>
  </div>
  </main>
)}

export default Main;
