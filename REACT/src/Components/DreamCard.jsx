const DreamCard = ({title,description, mood, dreamt_on}) => {
    return (
     <>
    <div id="dream-card">
        <h2>Title: {title}</h2>
        <h3>Mood: {mood}</h3>
        <p>Date: {dreamt_on}</p>
        <p>Description: {description}</p>
    </div>
    
    </> );
}
 
export default DreamCard;