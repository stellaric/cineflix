import React from "react";
import logo from "../../../media/img/logo_cineflix.png";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="header_detail">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo_cineflix" />
        </div>
        <Link to="/">
          <iconify-icon icon="iconamoon:home-light" />
        </Link>
      </nav>
    </header>
  );
}
