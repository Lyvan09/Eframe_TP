import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const [tasks, setTasks] = useState(() => {
  const donneesSauvegardees = localStorage.getItem("taskflow_data");
  return donneesSauvegardees ? JSON.parse(donneesSauvegardees) : [];
});

useEffect(() => {
  localStorage.setItem("taskflow_data", JSON.stringify(tasks));
}, [tasks]);

const handleAddTask = (nouvelleTache) => {
  setTasks([...tasks, nouvelleTache]); 
};

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div>
      <h1>TaskFlow – Dashboard</h1>
      <TaskForm onAddTask={handleAddTask} />
      <hr />
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}