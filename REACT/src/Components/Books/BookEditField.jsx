import { useState } from "react";

const BookEditField = ({ label, name, value, bookId, onSaved }) => {
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(value ?? "")

    async function handleSave() {
        const token = localStorage.getItem("token")
        const res = await fetch(`/api/books/${bookId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ [name]: draft }) 
            
        })
        if (!res.ok) {
            const err = await res.json()
            alert(err.error || 'Could not update')
            return;
        }

        const data = await res.json()
        onSaved(data.book)
        setEditing(false)
    }

    return (
        <p>
            {/* whats { " "} for? i also cant tell what the strong label is doing but maybe thats cause my label is already strong by default. */}
            <strong>{label}</strong>{" "} 
            {/* if editing === true */}
            {editing ? (
                <span>
                    {/* using the [name]:draft thing from ealier */}
                    <input value={draft} onChange={(e) => setDraft(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </span>
            ) : (
                <span>
                    {value}{" "}
                    {/* so whats this doing? is it accounting for if the field was empty on creation? cause I cant delete a field or anything or let it be empty using */}
                    <button onClick={() => { setDraft(value ?? ""); setEditing(true); }}>Edit</button>
                </span>
            )}
        </p>
    );
}

export default BookEditField;
