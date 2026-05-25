import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem("taskflow_data");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskflow_data", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (nouvelleTache) => {
    setTasks([...tasks, nouvelleTache]);
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.5px" }}>
          TaskFlow
        </h1>
        <p style={{ color: "var(--muted)", marginTop: "0.25rem", fontSize: "0.95rem" }}>
          {tasks.length} tâche{tasks.length !== 1 ? "s" : ""} en cours
        </p>
      </div>

      {/* Formulaire */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Liste */}
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {tasks.length === 0 ? (
          <p style={{ color: "var(--muted)", textAlign: "center", padding: "2rem" }}>
            Aucune tâche pour l'instant. Ajoutez-en une ci-dessus.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}