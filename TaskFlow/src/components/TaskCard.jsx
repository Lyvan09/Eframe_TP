import { Link } from "react-router-dom";

export default function TaskCard({ task }) {
  return (
    <Link to={`/task/${task.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem", cursor: "pointer" }}>      
        <h2>{task.titre}</h2>
        <p>{task.description}</p>
        <span>Statut : <strong>{task.statut}</strong></span>
      </div>
    </Link>
  );
}