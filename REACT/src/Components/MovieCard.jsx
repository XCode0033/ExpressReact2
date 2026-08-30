import { useContext } from "react";
import { MovieContext } from "../Context/MovieContext";

const MovieCard = ({id, title, director, year}) => {
    const { removeMovie } = useContext(MovieContext)
    async function handleDelete() {
       const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE"
       })
       if(res.ok) removeMovie(id)
    }
    return (  
        <>
        <div id="movie-card">
            <h2>Title: {title} </h2>
            <p>Director: {director}</p>
            <p>Year: {year}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
        </>
    );
}
 
export default MovieCard;