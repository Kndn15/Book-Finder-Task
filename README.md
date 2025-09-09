# 📚 Book Finder

A React + Vite web application to search books using the Open Library API.  
Built as a Take-Home Challenge to demonstrate API integration, React development, responsive UI, and error handling.

---

## 🚀 Features

- Search books by title and genre using Open Library API.
- Displays book covers, titles, authors in a responsive grid.
- Dark/light mode toggle with persistence.
- Loading and error states for graceful UX.
- Carousel with clickable genres.
- Fully responsive with Bootstrap.

---

## 🛠 Tech Stack

- React 18 (Hooks)
- Vite for fast development and build
- Axios for HTTP requests
- Bootstrap 5 for responsive UI and styling

---

## 📂 Setup Instructions

1. Clone repository:




2. Install dependencies:
npm install 
3. Start dev server:
npm run dev


4. Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 API Details

- Open Library Search API  
Example: `https://openlibrary.org/search.json?title=harry+potter`
- API returns book info: titles, authors, cover image IDs.

---

## 🖼 Screenshots / Demo

(Add screenshots or a GIF demo here.)

---

## 🌍 Deployment

Deployed to ().  
Supports hosting on CodeSandbox, Vercel, Netlify, or StackBlitz.

---

## 📘 How It Works

- User searches by title or selects genre.
- Book results fetched from Open Library API with Vite proxy for CORS.
- Books displayed with cover, author, and genre.
- Errors and empty results shown gracefully.
- Dark/light mode toggled with saved preferences.

---

## ✨ Future Enhancements

- Filter by author or subject
- Pagination or infinite scroll
- Detailed book view modal/page
- Save favorites locally

---

## 📓 Personal Development Notes

- Started with Vite React template using `npm create vite@latest`
- Added Bootstrap CSS & JS globally in `main.jsx`
- Configured proxy in `vite.config.js` to avoid CORS with Open Library API
- Used React hooks for state and effects
- Created reusable UI components: Navbar, Carousel, BooksGrid
- Managed API calls with Axios, handled errors and loading states
- Applied Bootstrap grid classes for responsive layouts
- Added dark/light theme toggle & persistent user preference in localStorage
- Debugged common API issues: 500 internal server errors and CORS
- Used URL encoding for search queries
- Added fallback UI for API errors and no results

---

## License

MIT License
