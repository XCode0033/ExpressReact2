import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import MovieForm from "../Components/MovieForm";
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

        <MovieForm onCreated={(m) => setMovies(prev => [...prev, m])}/>

        <div id="movie-cards">
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            director={movie.director}
            year={movie.year}
            onDelete={(id) => setMovies(prev => prev.filter(m => m.id !== id))}
            />
        ))}

        </div>
        </>
     );
}

export default MoviePage;
