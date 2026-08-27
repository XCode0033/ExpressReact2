import DreamCard from "../Components/DreamCard";
import DreamForm from "../Components/DreamForm";
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
        <h3>Dream Form</h3>
        <div>
            <DreamForm onCreated={(d) => setDreams(prev => [...prev, d])} />
        </div>
        <div id="dream-cards">
            {dreams.map((dream) => (
                <DreamCard 
                key={dream.id}
                id={dream.id}
                title={dream.title}
                mood={dream.mood}
                dreamt_on={dream.dreamt_on}
                description={dream.description}
                onDelete={(id) => setDreams(prev => prev.filter(d => d.id !== id))}
                />
            ))}

        </div>
        </>
     );
}
 
export default DreamPage;