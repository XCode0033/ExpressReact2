import { useState } from "react";

const DreamForm = ({onCreated}) => {
    const [form, setForm] = useState({title: '', description: '', mood:''})

   async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem("token")   // read fresh on every submit
        const res = await fetch('/api/dreams', {
            method: "POST",
            headers: {"Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
        
            },
            body: JSON.stringify(form)
        })
        if(!res.ok){
            const err = await res.json()
            alert(err.error || "Could not add dream");
            return;
        }
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