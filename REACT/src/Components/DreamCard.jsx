const DreamCard = ({id, title,description, mood, dreamt_on, onDelete}) => {
    async function handleDelete() {
        const res = await fetch(`/api/dreams/${id}`, {
            method: "DELETE"
        }) 
        if(res.ok) onDelete(id)
    }
    return (
     <>
    <div id="dream-card">
        <h2>Title: {title}</h2>
        <h3>Mood: {mood}</h3>
        <p>Date: {dreamt_on}</p>
        <p>Description: {description}</p>

        <button onClick={handleDelete}>Delete</button>
    </div>
    
    </> );
}
 
export default DreamCard;