import React, { useState } from "react";
import "./AddTaskForm.css";
import { FaRocket } from "react-icons/fa";
import { AddTaskFormProps } from "../../types";

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  // Add state for the points, defaulting to 100
  const [points, setPoints] = useState("100");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Parse the points string into a number before passing it
    onAddTask(title, parseInt(points, 10));
    setTitle("");
    setPoints("100"); // Reset to default after submission
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="What new challenge will you level up?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required // Makes sure the title is not empty
      />
      <input
        type="number"
        className="add-task-points-input"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        min="1" // Prevents negative points
      />
      <button type="submit" className="add-task-button">
        <FaRocket />
      </button>
    </form>
  );
};

export default AddTaskForm;
