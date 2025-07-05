import React from "react";
import { LevelingTask } from "../types"; // Make sure to import the type
import LevelingTaskCard from "../components/tasks/LevelingTaskCard";
import AddTaskForm from "../components/tasks/AddTaskForm";
import { useTasksContext } from "../context/TasksContext";

const HomeScreen: React.FC = () => {
  // Get only the specific things this page needs from the context
  const { tasks, addTask } = useTasksContext();

  return (
    <>
      <header className="app-header">
        <h1>Levelling</h1>
      </header>
      {/* The AddTaskForm receives the addTask function */}
      <AddTaskForm onAddTask={addTask} />

      {/* The main list where we map over the tasks */}
      <main className="task-grid">
        {tasks.map((task: LevelingTask) => (
          // The card is now a simple link and manages its own logic internally
          // by using the context. We only need to pass the task data to it.
          <LevelingTaskCard key={task.id} task={task} />
        ))}
      </main>
    </>
  );
};

export default HomeScreen;
