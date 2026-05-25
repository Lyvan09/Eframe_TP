export default function TaskCard({ task }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
      <h2>{task.titre}</h2>
      <p>{task.description}</p>
      <span>Statut : <strong>{task.statut}</strong></span>
    </div>
  );
}