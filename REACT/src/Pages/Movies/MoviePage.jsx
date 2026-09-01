import { useContext } from "react";
import { MovieContext } from "../../Context/MovieContext";
import MovieCard from "../../Components/Movies/MovieCard";
import MovieForm from "../../Components/Movies/MovieForm";
const MoviePage = () => {
   
   const { movies } = useContext(MovieContext);
   
    return (
        <>
        <h1>My Movies</h1>
        <MovieForm />

        <div id="movie-cards">
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            id={movie.id}
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
