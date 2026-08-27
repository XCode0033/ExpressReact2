const MovieCard = ({title, director, year}) => {
    return (  
        <>
        <div id="movie-card">
            <h2>Title: {title} </h2>
            <p>Director: {director}</p>
            <p>Year: {year}</p>
        </div>
        </>
    );
}
 
export default MovieCard;