
import React, { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Services", href: "/services" },
    { name: "Insights", href: "/insights" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-mark">
            A
          </div>

          <div className="logo-text">
            <span className="logo-name">Meliha's</span>
            <span className="logo-role">DIGITAL SOLUTIONS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="nav-link"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <Link
            to="/contact"
            className="nav-contact"
          >
            Let's Talk
            <ArrowUpRight size={17} />
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation"
          >
            {menuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav ${
          menuOpen ? "mobile-nav-open" : ""
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="/contact"
          className="mobile-contact"
          onClick={closeMenu}
        >
          Let's Talk
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
