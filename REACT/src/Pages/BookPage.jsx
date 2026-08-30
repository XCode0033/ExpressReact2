import { useEffect, useState } from "react"
import BookForm from "../Components/BookForm"
import BookCard from "../Components/BookCard"
const BookPage = () => {
    const [books, setBooks] = useState([])

   useEffect(() => {
            async function loadBooks() {
                const res = await fetch('/api/books')
                const data = await res.json()
    
                setBooks(data.books)

            }
            loadBooks()
        }, [])
        
   

    return ( 
        <>
        <Link to='/'>Home</Link>

        <BookForm onCreated={(b) => setBooks(prev => [...prev, b])}/>
        {books.map((book) => (
            <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            year={book.year}
            genre={book.genre}
            onDelete={(id) => setBooks(prev => prev.filter(b => b.id !== id))}
            />
        ))}
        </>
     );
}
 
export default BookPage;