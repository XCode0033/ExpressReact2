import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext(null) // null is the default value is no one provides one.


export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);   // start empty again

  useEffect(() => {
    async function loadMovies() {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data.movies);
    }
    loadMovies();
  }, []);

  function addMovie(movie) {
    setMovies((prev => [...prev, movie]))
  }


  function removeMovie(id){
    setMovies((prev) => prev.filter((m) => m.id !== id))
  }

  
  return (
    <MovieContext.Provider value={{movies, addMovie, removeMovie}}>
      {children}
    </MovieContext.Provider>
  );
}