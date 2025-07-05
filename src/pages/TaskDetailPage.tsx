import React from "react";
import { useParams, Link } from "react-router-dom"; // 1. Import Link
import { IoArrowBack } from "react-icons/io5"; // 2. Import a back arrow icon
import { useTasksContext } from "../context/TasksContext";
import LevelingTaskCard from "../components/tasks/LevelingTaskCard";

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasksContext(); // We only need tasks here to find the right one
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="page-centered">
        <h2>Task not found!</h2>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* 3. ADD THE BACK BUTTON */}
      <div className="page-header">
        <Link to="/" className="back-button" title="Go Back">
          <IoArrowBack />
        </Link>
      </div>
      <main className="tasks-list">
        <LevelingTaskCard task={task} isDetailPage={true} />
      </main>
    </div>
  );
};

export default TaskDetailPage;
