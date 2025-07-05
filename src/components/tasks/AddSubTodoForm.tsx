import React, { useState } from "react";
import "./AddSubTodoForm.css";
import { AddSubTodoFormProps } from "../../types";

const AddSubTodoForm: React.FC<AddSubTodoFormProps> = ({ onAddSubTodo }) => {
  const [text, setText] = useState("");
  // Add state for points, defaulting to 10
  const [points, setPoints] = useState("10");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddSubTodo(text, parseInt(points, 10));
    setText("");
    setPoints("10"); // Reset points to default
  };

  return (
    <form className="add-subtodo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-subtodo-input"
        placeholder="Add a checklist item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="number"
        className="add-subtodo-points-input"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        min="1"
      />
      <button type="submit" className="add-subtodo-button">
        +
      </button>
    </form>
  );
};

export default AddSubTodoForm;
