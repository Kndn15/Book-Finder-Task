import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import BooksGrid from "./components/BooksGrid";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <>
      <Navbar
        onSearch={(term) => setSearchTerm(term)}
        onGenreSelect={(g) => setGenre(g)}
        onBrandClick={() => {
          setSearchTerm("");
          setGenre("");
        }}
      />
      <Carousel onGenreSelect={(g) => setGenre(g)} />
      <BooksGrid searchTerm={searchTerm} genre={genre} />
    </>
  );
}

export default App;
