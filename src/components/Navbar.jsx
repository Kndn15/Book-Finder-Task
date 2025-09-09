import React, { useEffect, useState } from "react";

const GENRES = [
  "Fiction",
  "Fantasy",
  "Romance",
  "Mystery",
  "Thriller",
  "Science Fiction",
  "Horror",
  "Biography",
  "History",
  "Adventure",
  "Poetry",
  "Children",
  "Self-Help",
  "Philosophy",
  "Business",
];

export default function Navbar({
  onGenreSelect = () => {},
  onSearch = () => {},
  onBrandClick = () => {},
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Set Bootstrap theme attribute on <html>
    document.documentElement.setAttribute("data-bs-theme", theme);
    // Save preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  const handleGenreClick = (g) => {
    onGenreSelect(g);
    setDropdownOpen(false);
  };

  // Dynamic class based on theme—using bootstrap 5.3 preferred bg classes and navbar-dark/light
  const navClass = `navbar navbar-expand-lg ${
    theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
  } shadow-sm border-bottom`;

  return (
    <nav className={navClass} aria-label="Main navigation">
      <div className="container-fluid">
        <a
          href="#"
          className="navbar-brand fw-bold me-3"
          onClick={(e) => {
            e.preventDefault();
            onBrandClick();
          }}
        >
          Book Finder
        </a>

        {/* Genres dropdown */}
        <div
          className="nav-item dropdown me-3"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a
            className="nav-link dropdown-toggle fw-semibold"
            href="#"
            role="button"
            aria-expanded={dropdownOpen}
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen((s) => !s);
            }}
          >
            Genres
          </a>
          <ul className={`dropdown-menu${dropdownOpen ? " show" : ""}`}>
            <li>
              <button className="dropdown-item" onClick={() => handleGenreClick("")}>
                All Genres
              </button>
            </li>
            {GENRES.map((g) => (
              <li key={g}>
                <button className="dropdown-item" onClick={() => handleGenreClick(g)}>
                  {g}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-grow-1" />

        {/* Search form */}
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search title or keyword"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>

        {/* Theme toggle */}
        <button
          className="btn btn-outline-secondary ms-2"
          onClick={handleToggleTheme}
          aria-pressed={theme === "dark"}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
