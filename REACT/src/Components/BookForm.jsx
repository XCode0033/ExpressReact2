
import { useState } from "react";
const BookForm = ({onCreated}) => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        year: '',
        genre: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/books', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(form)
        })

        const data = await res.json()

        onCreated(data.book)

        setForm({
            title: '',
            author: '',
            year: '',
            genre: ''
        })
    }
    return ( 
        <>
        <div>
       <form onSubmit={handleSubmit}>
         <input 
        value={form.title}
        onChange={(e) => setForm({...form, title:e.target.value})}
        placeholder="Title"/>

        <input 
        value={form.author}
        onChange={(e) => setForm({...form, author: e.target.value})}
        placeholder="Author"
        />

        <input 
        value={form.year}
        onChange={(e) => setForm({...form, year: e.target.value})}
        placeholder="Year"/>

        <input 
        value={form.genre}
        onChange={(e) => setForm({...form, genre: e.target.value})}
        placeholder="Genre"/>

        <button type="submit">Add Book</button>
       </form>
        
        </div>
        </>
     );
}
 
export default BookForm;