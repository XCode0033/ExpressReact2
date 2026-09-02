import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DreamEditField from "../../Components/Dreams/DreamEditField";
const DreamDetail = () => {
  const { id } = useParams();
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDream() {
      try {
        const res = await fetch(`/api/dreams/${id}`);
        if (!res.ok) throw new Error("Dream not found.");
        const data = await res.json();
        setDream(data.dream);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDream();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!dream) return null;
  const handleSave = updated => setDream(updated)
  return (
    <>
      <Link to="/dreams">Back to Dreams</Link>
      <h1>Title: {dream.title}</h1>
      <h3>Mood: {dream.mood}</h3>
      <p>Date: {dream.dreamt_on}</p>
      <p>Description: {dream.description}</p>

      <DreamEditField label='Title' name='title' value={dream.title} dreamId={dream.id} onSaved={handleSave}/>
      <DreamEditField label='Mood' name='mood' value={dream.mood} dreamId={dream.id} onSaved={handleSave}/>
      <DreamEditField label='Date' name='dreamt_on' value={dream.dreamt_on} dreamId={dream.id} onSaved={handleSave}/>
      <DreamEditField label='Description' name='description' value={dream.description} dreamId={dream.id} onSaved={handleSave}/>

    </>
  );
};

export default DreamDetail;
