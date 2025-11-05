import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailView() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
// useEffect triggers data fetch when component mounts or `id` changes
  useEffect(() => {
    async function fetchCharacter() {
      try {
        const response = await fetch(`https://api.disneyapi.dev/characters/${id}`);
        const data = await response.json();
        // Assuming API response shape has data inside `data`
        setCharacter(data.data || data);  // fallback to data directly
      } catch (error) {
        console.log("Error fetching Disney character details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCharacter();
  }, [id]);
// The displeyed of loading message while fetche Disney Data
  if (isLoading) return <p>Loading character details...</p>;
// It shows a message while fetching disney data
  if (!character) return <p>Character not found.</p>;

  // Helper to display array or "None"
  const displayList = (arr) => (arr && arr.length > 0 ? arr.join(", ") : "None");
// Render detailed info about the Disney Characters
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{character.name}</h2>
      <img
        src={character.imageUrl}
        alt={character.name} 
        style={{ width: "200px", borderRadius: "10px" }}
      />
      <p><strong>Films:</strong> {displayList(character.films)}</p>
      <p><strong>TV Shows:</strong> {displayList(character.tvShows)}</p>
      <p><strong>Video Games:</strong> {displayList(character.videoGames)}</p>
      <p><strong>Allies:</strong> {displayList(character.allies)}</p>
      <p><strong>Enemies:</strong> {displayList(character.enemies)}</p>
    </div>
  );
}

export default DetailView;
