import { useState, useEffect } from "react";
import {useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadGame(){
            try{
                const res = await fetch(`/api/games/${id}`)
                if(!res.ok) throw new Error ('Error on react fetch side.')
                const data = await res.json();
                setGame(data.game)
            }catch(err) {
                setError(err.message)
            }finally {
                setLoading(false)
            }
        }
        loadGame();
    }, [id])

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    if(!game) return null;
    return ( 
        <>
        <Link to="/games">Back to games</Link>

        <h1>Title: {game.title}</h1>
        <p>Genre: {game.genre}</p>
        </>
     );
}
 
export default GameDetail;