import { useState } from "react";

const DreamEditField = ({label, name, value, dreamId, onSaved}) => {
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(value ?? "")

    async function handleSave() {
        const token = localStorage.getItem("token")
        const res = await fetch(`/api/dreams/${dreamId}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({[name]:draft})
        })
        if(!res.ok) {
            const err = await res.json()
            alert(err.error || 'Could not update')
            return;
        }
        const data = await res.json()
        onSaved(data.dream)
        setEditing(false)
    }
    return ( 
    <>
    <p>
        <strong>{label}</strong>{" "}
        {editing ? (
            <span>
                <input value={draft} onChange={(e) => setDraft(e.target.value)} />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>

            </span>
        ):(
            <span>
                <button onClick={() => {setDraft(value ?? ""); setEditing(true);}}>Edit</button>

            </span>
        )}
    </p>
    </> );
}
 
export default DreamEditField;