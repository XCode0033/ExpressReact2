
const BookCard = ({id, title, author, year, genre, onDelete}) => {
    async function handleDelete() {
       const res = await fetch(`/api/books/${id}`, {
           method: "DELETE"
       })
       if(res.ok) onDelete(id)
    }
    return ( 
        <>
        <div>
        <h2>Title: {title}</h2>
        <h3>Author: {author}</h3>
        <p>Year: {year}</p>
        <p>Genre: {genre}</p>
        <button onClick={handleDelete}>Delete</button>
        </div>
        </>
     );
}
 
export default BookCard;