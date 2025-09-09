import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookGrid.css"
export default function BooksGrid({ searchTerm, genre }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkDetails = async (workKey) => {
  try {
const res = await axios.get(`/openlibrary${workKey}.json`);
    return res.data;
  } catch (err) {
    console.warn("Work details fetch failed for", workKey, err);
    return {};
  }
};


const buildQuery = () => {
  let q = '';
  if (searchTerm) {
    q += `title:${searchTerm}`;
  }
  if (genre) {
    q += (q ? ' AND ' : '') + `subject:${genre}`;
  }
  if (!q) {
    q = 'subject:fiction';  // Better fallback: specific and low-load
  }
  return `/openlibrary/search.json?q=${encodeURIComponent(q)}&limit=12`;
};


  // Helper: truncate text to first n sentences, add ... only if longer
  const getDescriptionSnippet = (text, minSentences = 5) => {
    if (!text) return "No description available.";
    const sentences = text.split(/(?<=[.?!])\s+/);
    let snippet = sentences.slice(0, minSentences).join(" ");
    if (sentences.length > minSentences && snippet.length < text.length) snippet += " ...";
    return snippet;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = buildQuery();
        const res = await axios.get(url);
        const docs = res.data.docs || [];

        const detailedBooks = await Promise.all(
          docs.map(async (book) => {
            const workKey = Array.isArray(book.work_key) ? book.work_key[0] : book.key;
            const workDetails = await fetchWorkDetails(workKey);
            return { ...book, workDetails };
          })
        );

        setBooks(detailedBooks);
      } catch (err) {
    if (err.response?.status === 500 && retries > 0) {
      console.warn(`API 500 error, retrying... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));  // Exponential backoff
      return fetchBooks(retries - 1);
    }
    setError(`Failed to load books: ${err.response?.status === 500 ? 'Server error (try again soon)' : 'Network issue'}. Please try another search.`);
    console.error("Error fetching books:", err);
  } finally {
    setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm, genre]);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        {genre
          ? `📚 ${genre} Books`
          : searchTerm
          ? `Results for "${searchTerm}"`
          : "🔥 Popular Books"}
      </h2>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" aria-label="Loading spinner">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error} <br />
          <button className="btn btn-link" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <p className="text-center">No books found. Try another search or genre.</p>
      )}

      <div className="row">
        {books.map((book) => {
          const work = book.workDetails || {};

          const title = book.title || work.title || "Unknown Title";

          const authors = book.author_name
            ? book.author_name.join(", ")
            : work.authors
            ? work.authors.map((a) => a.name).join(", ")
            : "Unknown";

          const genreDisplay =
            work.subjects && work.subjects.length > 0
              ? work.subjects[0]
              : book.subject && book.subject.length > 0
              ? book.subject[0]
              : "N/A";

          let fullDescription = "No description available.";
          if (work.description) {
            if (typeof work.description === "string") fullDescription = work.description;
            else if (work.description.value) fullDescription = work.description.value;
          } else if (book.first_sentence) {
            fullDescription = Array.isArray(book.first_sentence)
              ? book.first_sentence[0]
              : book.first_sentence;
          } else if (book.subtitle) {
            fullDescription = book.subtitle;
          }

          const descriptionPreview = getDescriptionSnippet(fullDescription, 5);

          return (
            <div key={book.key} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : "https://via.placeholder.com/150x220?text=No+Cover"
                  }
                  className="card-img-top"
                  alt={title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text mb-1">
                    <strong>Author:</strong> {authors}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Genre:</strong> {genreDisplay}
                  </p>
                  <p className="card-text">{descriptionPreview}</p>
                  <a
                    href={`https://openlibrary.org${book.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
