import { useEffect, useState } from "react";
import GameCard from "../Components/GameCard";
import { Link } from "react-router-dom";
const GamePage = () => {
    const [games, setGames] = useState([]);
  
    useEffect(() => {
        async function loadGames() {
            const res = await fetch("/api/games");
            const data = await res.json();
            setGames(data.games);
        }

        loadGames();
    }, []);

    return (
        <>
            <p>My Games</p>
            <Link to="/">Home</Link>
            <div id="game-cards">
            {games.map((game) => (
                <GameCard
                key={game.id}
                title={game.title}
                genre={game.genre} />
            ))}
            </div>
        </>
    );
}

export default GamePage;
