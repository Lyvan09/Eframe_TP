import { useState } from "react";
import TaskCard from "../components/TaskCard";

const initialTasks = [
  {
    id: 1,
    titre: "Conception de l'ontologie",
    description: "Rédiger les axiomes de base du domaine.",
    statut: "A faire",
  },
  {
    id: 2,
    titre: "Développement de l'API",
    description: "Implémenter les endpoints REST.",
    statut: "En cours",
  },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div>
      <h1>TaskFlow – Dashboard</h1>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}