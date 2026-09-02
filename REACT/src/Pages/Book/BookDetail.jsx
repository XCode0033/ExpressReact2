import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookEditField from "../../Components/Books/BookEditField";
const BookDetail = () => {
  const { id } = useParams();          // "/books/3" -> id === "3"
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Book not found");
        const data = await res.json();
        setBook(data.book);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return null;

  const handleSaved = (updated) => setBook(updated)
  return (
    <>
      <Link to="/books">← Back to books</Link>
      <h1>{book.title}</h1>
     

      <BookEditField label="Title" name='title' value={book.title} bookId={book.id} onSaved={handleSaved} />
      <BookEditField label="Author" name='author' value={book.author} bookId={book.id} onSaved={handleSaved} />
      <BookEditField label="Year" name='year' value={book.year} bookId={book.id} onSaved={handleSaved} />
      <BookEditField label="Genre" name='genre' value={book.genre} bookId={book.id} onSaved={handleSaved} />

    </>
  );
};

export default BookDetail;
