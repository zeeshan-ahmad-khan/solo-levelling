import React from "react";
import { SubTodoListProps } from "../../types"; // Import Props
import SubTodoItem from "./SubTodoItem";

const SubTodoList: React.FC<SubTodoListProps> = ({ taskId, subTodos }) => {
  return (
    <div className="subtodo-list">
      {subTodos.map((subTodo) => (
        <SubTodoItem key={subTodo.id} subTodo={subTodo} taskId={taskId} />
      ))}
    </div>
  );
};

export default SubTodoList;
