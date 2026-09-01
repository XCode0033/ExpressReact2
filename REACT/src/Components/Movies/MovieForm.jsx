import { useContext, useState } from "react";
import { MovieContext } from "../../Context/MovieContext";
import { useParams } from 'react-router-dom'
const MovieForm = () => {
    const {addMovie} = useContext(MovieContext)
    const [form, setForm] = useState({title: '', director: '', year: ''})

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await res.json();
        addMovie(data.movie)

        setForm({title: '', director: '', year: '' })
    }

    
    return ( 
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                value={form.title}
                onChange={(e) => setForm({...form, title:e.target.value})}
                placeholder="Title"
                />

                <input
                value={form.director}
                onChange={(e) => setForm({...form, director: e.target.value})}
                placeholder="Director" />

                <input 
                value={form.year}
                onChange={(e) => setForm({...form, year: e.target.value})}
                placeholder="Year"
                />
                <button type="submit">Add Movie</button>
            </form>
        </div>
        </>
     );
}
 
export default MovieForm;