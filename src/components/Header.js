import React from "react";
import "../styles/styles.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify Logo"
          className="logo-image"
        />
        <nav className="nav">
          <a href="#foryou" className="nav-link">
            For You
          </a>
          <a href="#toptracks" className="nav-link">
            Top Tracks
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
