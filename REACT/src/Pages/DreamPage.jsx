import DreamCard from "../Components/DreamCard";
import {useState, useEffect} from 'react'
const DreamPage = () => {

    const [dreams, setDreams] = useState([])
    useEffect(() => {
       async function loadDreams() {
            const res = await fetch('/api/dreams')
            const data = await res.json()
            setDreams(data.dreams)
        }
        loadDreams()
    }, [])
    return ( 
        <>
        <h1>Dream Page</h1>
        <div id="dream-cards">
            {dreams.map((dream) => (
                <DreamCard 
                key={dream.id}
                title={dream.title}
                mood={dream.mood}
                dreamt_on={dream.dreamt_on}
                description={dream.description}
                
                />
            ))}

        </div>
        </>
     );
}
 
export default DreamPage;