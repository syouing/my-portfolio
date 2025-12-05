import React from "react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-left">
        <a href="#hero" className="logo">
          Shota<span>Tanaka</span>
        </a>
      </div>
      <nav className="nav-right">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Navbar;