import { useState } from "react";
import { Link } from "react-router-dom";

const BookCard = ({ id, title, author, year, genre, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  async function handleDelete() {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) onDelete(id);
  }

  async function handleSave() {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: draft }), // just the one field
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Could not update");
      return;
    }
    const data = await res.json();
    onUpdate(data.book); // hand the updated row up to the page
    setEditing(false);
  }

  function handleCancel() {
    setDraft(title); // throw away edits
    setEditing(false);
  }

  return (
    <div>
      {editing ? (
        <div>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <h2>
          Title: {title} <button onClick={() => setEditing(true)}>Edit</button>
        </h2>
      )}

      <h3>Author: {author}</h3>
      <p>Year: {year}</p>
      <p>Genre: {genre}</p>
      <Link to={`/books/${id}`}>View</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BookCard;
