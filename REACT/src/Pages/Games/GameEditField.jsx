import { useState } from "react";

const GameEditField = ({label, name, value, gameId, onSaved}) => {
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(value ?? "")

    async function handleSave() {
        const token = localStorage.getItem("token")
        const res = await fetch(`/api/games/${gameId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({[name]:draft})
        })

        if(!res.ok){
            const err = await res.json();
            alert(err.error || 'Could not replace')
            return;
        }

        const data = await res.json()
        onSaved(data.game)
        setEditing(false)
    }
    return ( 
        <>
        <strong>{label}</strong>{" "}
        {editing ? (
            <span>
                <input value={draft} onChange={(e) => setDraft(e.target.value)}/>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
            </span>
        ) : (
            <span>
                {value}{" "}
                <button onClick={() => {setDraft(value ?? ""); setEditing(true)}}>Edit</button>
            </span>
        )}
        </>
        
     );
}
 
export default GameEditField;