import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { SubTodoItemProps } from "../../types"; // Import Props
import { useTasksContext } from "../../context/TasksContext";
import "./SubTodoItem.css";

const SubTodoItem: React.FC<SubTodoItemProps> = ({ subTodo, taskId }) => {
  const {
    handleSubTodoToggle,
    deleteSubTodo,
    editSubTodo,
    editingSubTodoId,
    setEditingSubTodoId,
  } = useTasksContext();

  const isEditing = editingSubTodoId === subTodo.id;
  const [newText, setNewText] = useState(subTodo.text);
  const [newPoints, setNewPoints] = useState(subTodo.points.toString());

  useEffect(() => {
    if (!isEditing) {
      setNewText(subTodo.text);
      setNewPoints(subTodo.points.toString());
    }
  }, [isEditing, subTodo.text, subTodo.points]);

  const handleSave = () =>
    editSubTodo(taskId, subTodo.id, newText, parseInt(newPoints, 10));
  const handleCancel = () => setEditingSubTodoId(null);
  const handleToggle = () =>
    !isEditing && handleSubTodoToggle(taskId, subTodo.id);
  const handleDelete = () => deleteSubTodo(taskId, subTodo.id);
  const handleSetEditing = () => setEditingSubTodoId(subTodo.id);

  const itemClassName = `subtodo-item ${subTodo.completed ? "completed" : ""} ${
    isEditing ? "editing" : ""
  }`;

  return (
    <div className={itemClassName}>
      <div className="checkbox-container" onClick={handleToggle}>
        <input type="checkbox" checked={subTodo.completed} readOnly />
        <span className="checkmark"></span>
      </div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="subtodo-edit-text"
            autoFocus
          />
          <input
            type="number"
            value={newPoints}
            onChange={(e) => setNewPoints(e.target.value)}
            className="subtodo-edit-points"
            min="1"
          />
        </>
      ) : (
        <>
          <p className="subtodo-text">{subTodo.text}</p>
          <span className="subtodo-points">{subTodo.points} pts</span>
        </>
      )}
      <div className="subtodo-controls">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="subtodo-control-button confirm"
              title="Confirm"
            >
              <FaCheck />
            </button>
            <button
              onClick={handleCancel}
              className="subtodo-control-button cancel"
              title="Cancel"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSetEditing}
              className="subtodo-control-button edit"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="subtodo-control-button delete"
              title="Delete"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SubTodoItem;
