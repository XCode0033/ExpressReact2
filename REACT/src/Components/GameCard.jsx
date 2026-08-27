
const GameCard = ({title, genre}) => {
    return ( 
        <>
        <div id="game-cards">
        
        <div id="card">
        <p>Title: {title}</p>
        <p>Genre: {genre}</p>   

        </div>
        
        </div>
        </>
     );
}
 
export default GameCard;