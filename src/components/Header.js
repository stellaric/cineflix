import "../App.css";
import logo from "../media/img/logo_cineflix.png";
import logo_banner from "../media/img/logo_banner.png";
import React from "react";
import video from "../media/video/fd_banniere.mp4";
import Search from "./Search";

export default function Header() {

  
  return (
    <header className="header">
      <div className="filter">
{/*navbar */}
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="logo_cineflix" />
          </div>
          <Search />
        </nav>
{/*banniere */}
        <div className="banniere">

          <video id="background-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>

          <div className="content">

            <img src={logo_banner} alt="logo_cineflix" />

          </div>

        </div>
      </div>
    </header>
  );
}
