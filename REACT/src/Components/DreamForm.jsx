import { useEffect, useState } from "react";

const DreamForm = ({onCreated}) => {
    const [form, setForm] = useState({title: '', description: '', mood:''})

 

   async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('/api/dreams', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(form)
        })
        const data = await res.json();
        
        onCreated(data.dream)

        setForm({title: '', description: '', mood: ''})
    }
    return ( 
        <>
        <div>
        <form onSubmit={handleSubmit}>
        <input
        value={form.title}
        onChange={(e) => setForm({...form, title: e.target.value})}
        placeholder="Title" />

        <input
        value={form.mood}
        onChange={(e) => setForm({...form, mood: e.target.value})}
        placeholder="Mood" />

        <textarea
        value={form.description}
        onChange={(e) => setForm({...form, description: e.target.value})}
        placeholder="Description" />

        <button type="submit">Add Dream</button>
        </form>
        </div>
        </>
     );
}
 
export default DreamForm;