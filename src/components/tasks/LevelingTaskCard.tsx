import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { LevelingTaskCardProps } from "../../types"; // Import Props
import { useTasksContext } from "../../context/TasksContext";
import ProgressBar from "../common/ProgressBar";
import SubTodoList from "./SubTodoList";
import AddSubTodoForm from "./AddSubTodoForm";
import "./LevelingTaskCard.css";

const LevelingTaskCard: React.FC<LevelingTaskCardProps> = ({
  task,
  isDetailPage = false,
}) => {
  const {
    deleteTask,
    editTaskTitle,
    editingTaskId,
    setEditingTaskId,
    addSubTodo,
  } = useTasksContext();

  const { id, title, level, currentPoints, pointsForNextLevel, subTodos } =
    task;
  const [newTitle, setNewTitle] = useState(title);
  const isEditing = editingTaskId === id;

  useEffect(() => {
    if (!isEditing) setNewTitle(title);
  }, [isEditing, title]);

  const handleEditClick = () => setEditingTaskId(id);
  const handleCancelEdit = () => setEditingTaskId(null);
  const handleTitleSave = () => editTaskTitle(id, newTitle);

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteTask(id);
    }
  };

  const cardContent = (
    <div className={`task-card ${isEditing ? "editing" : ""}`}>
      <div className="card-header">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
            className="title-edit-input"
          />
        ) : (
          <h2 className="card-title">{title}</h2>
        )}
        <div className="header-controls">
          {isEditing ? (
            <>
              <button
                onClick={handleTitleSave}
                className="control-button confirm"
                title="Confirm Changes"
              >
                <FaCheck />
              </button>
              <button
                onClick={handleCancelEdit}
                className="control-button cancel"
                title="Cancel Changes"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <span className="card-level">LVL {level}</span>
              {!isDetailPage && (
                <button
                  onClick={handleEditClick}
                  className="control-button edit"
                  title="Edit Title"
                >
                  <FaEdit />
                </button>
              )}
              {!isDetailPage && (
                <button
                  onClick={handleDeleteClick}
                  className="control-button delete"
                  title="Delete Task"
                >
                  <FaTrash />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="progress-container">
        <div className="progress-info">
          <span>Progress</span>
          <span>
            {currentPoints} / {pointsForNextLevel} pts
          </span>
        </div>
        <ProgressBar
          currentValue={currentPoints}
          maxValue={pointsForNextLevel}
        />
      </div>
      {isDetailPage && (
        <div className="card-body">
          <AddSubTodoForm
            onAddSubTodo={(text, points) => addSubTodo(id, text, points)}
          />
          <SubTodoList taskId={id} subTodos={subTodos} />
        </div>
      )}
    </div>
  );

  return isDetailPage ? (
    cardContent
  ) : (
    <Link to={`/task/${id}`} className="task-link">
      {cardContent}
    </Link>
  );
};

export default LevelingTaskCard;
