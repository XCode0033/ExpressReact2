
const GameCard = ({id,title, genre, onDelete}) => {
    async function handleDelete() {
        const res = await fetch(`/api/games/${id}`, {
            method: "DELETE"

        }) 
        if(res.ok) onDelete(id)
    }
    return ( 
        <>
        <div id="game-cards">
        
        <div id="card">
        <p>Title: {title}</p>
        <p>Genre: {genre}</p>   
        <button onClick={handleDelete}>Delete</button>
        </div>
        
        </div>
        </>
     );
}
 
export default GameCard;