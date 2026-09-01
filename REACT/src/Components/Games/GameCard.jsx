import { Link } from "react-router-dom";
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
        <Link to={`/games/${id}`} style={{marginRight: 10}}>View Game</Link>
        <button onClick={handleDelete}>Delete</button>
        </div>
        
        </div>
        </>
     );
}
 
export default GameCard;