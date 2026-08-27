import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../Components/MovieCard";
const MoviePage = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
            async function loadMovies() {
                const res = await fetch('/api/movies');
                const data = await res.json()

                setMovies(data.movies)
            }
            loadMovies();
        }, [])
    return ( 
        <>
        <h1>My Movies</h1>

        <div id="movie-cards">
        {movies.map((movie) => (
            <MovieCard 
            key={movie.id}
            title={movie.title}
            director={movie.director}
            year={movie.year}
            />
        ))}

        </div>
        </>
     );
}
 
export default MoviePage;