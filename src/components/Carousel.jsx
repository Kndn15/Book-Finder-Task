import React from "react";
import "../styles/HeroSection.css"
import NovelImg from "../images/Novel.png"
import SeriesImg from "../images/Series.png"
import DetectiveImg from "../images/Detective.png"
import FictionImg from "../images/Fiction.png"

const slides = [
  {
    genre: "Novel",
    img: NovelImg,
    text: "Rumour has it walking through eggshells is safer than walking through a bookstore. 📖",
  },
  {
    genre: "Series",
    img: SeriesImg,
    text: "⚠️ Warning: Don’t disturb while binge-reading… we can’t guarantee you’ll get them back.",
  },
  {
    genre: "Detective",
    img: DetectiveImg,
    text: "It is said no reader commits crime… except loving the villain. 🕵️‍♂️",
  },
  {
    genre: "Fiction",
    img: FictionImg,
    text: "Better check your standards — after this, reality may not measure up. 🌌",
  },
];


const Carousel = ({ onGenreSelect }) => {
  return (
    <div id="bookCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div
            key={slide.genre}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
            onClick={() => onGenreSelect(slide.genre)}
            style={{ cursor: "pointer" }}
          >
            <img src={slide.img} className="d-block w-100" alt={slide.genre} onError={(e) => { e.target.src = 'https://via.placeholder.com/800x450?text=' + slide.genre; }}/>
<div className="carousel-caption bg-dark bg-opacity-50 rounded">
              <h5>{slide.genre}</h5>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
