import { useState } from "react";

const inputStyle = {
  width: "100%", padding: "0.6rem 0.85rem",
  border: "1px solid var(--border)", borderRadius: "var(--radius)",
  fontSize: "0.9rem", fontFamily: "inherit",
  background: "var(--surface)", color: "var(--text)",
  outline: "none", transition: "border-color 0.15s",
};

export default function TaskForm({ onAddTask }) {
  const [titre, setTitre]             = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut]           = useState("A faire");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onAddTask({ id: Date.now(), titre, description, statut });
    setTitre(""); setDescription(""); setStatut("A faire");
  };

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.25rem 1.5rem",
      boxShadow: "var(--shadow)",
    }}>
      <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
        Nouvelle tâche
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          style={inputStyle} placeholder="Titre de la tâche"
          value={titre} onChange={e => setTitre(e.target.value)}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e  => e.target.style.borderColor = "var(--border)"}
        />
        <textarea
          style={{ ...inputStyle, resize: "vertical", minHeight: "70px" }}
          placeholder="Description (optionnelle)"
          value={description} onChange={e => setDescription(e.target.value)}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e  => e.target.style.borderColor = "var(--border)"}
        />

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <select
            style={{ ...inputStyle, flex: 1, cursor: "pointer" }}
            value={statut} onChange={e => setStatut(e.target.value)}
          >
            <option value="A faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Termine">Terminé</option>
          </select>

          <button onClick={handleSubmit} style={{
            padding: "0.6rem 1.4rem", background: "var(--accent)",
            color: "#fff", border: "none", borderRadius: "var(--radius)",
            fontSize: "0.9rem", fontWeight: 500, cursor: "pointer",
            fontFamily: "inherit", whiteSpace: "nowrap",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            + Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}