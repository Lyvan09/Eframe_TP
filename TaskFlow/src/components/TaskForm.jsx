import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState("A faire");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const nouvelleTache = {
      id: Date.now(),
      titre,
      description,
      statut,
    };
    onAddTask(nouvelleTache); 

    setTitre("");
    setDescription("");
    setStatut("A faire");
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      <div onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <select value={statut} onChange={(e) => setStatut(e.target.value)}>
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Termine">Terminé</option>
        </select>
        <br />
        <button onClick={handleSubmit}>Ajouter</button>
      </div>
    </div>
  );
}