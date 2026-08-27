import { useState } from "react";

const GameForms = ({onCreated}) => {
    const [form, setForm] = useState({title: '', genre: ''})

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/games', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(form)
        })
        const data = await res.json()

        onCreated(data.game)

        setForm({title: '', genre: ''})
    }
    return ( 

        <>
        <div>
        <form onSubmit={handleSubmit}>
          
            <input
        value={form.title}
        onChange={(e) => setForm({...form, title: e.target.value})}
        placeholder="Title"
        />
            <input
        value={form.genre}
        onChange={(e) => setForm({...form, genre: e.target.value})}
        placeholder="genre"
        />


        <button type="submit">Add Game</button>
        </form>

        </div>
        </>
     );
}
 
export default GameForms;