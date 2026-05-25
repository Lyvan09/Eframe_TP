import { useParams, Link } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();

  // Lecture dans localStorage pour retrouver la tâche
  const tasks = JSON.parse(localStorage.getItem("taskflow_data")) || [];
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div>
        <p>Tâche introuvable.</p>
        <Link to="/">Retour au Dashboard</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{task.titre}</h1>
      <p><strong>Description :</strong> {task.description}</p>
      <p><strong>Statut :</strong> {task.statut}</p>
      <p><strong>ID :</strong> {task.id}</p>
      <Link to="/">← Retour au Dashboard</Link>
    </div>
  );
}