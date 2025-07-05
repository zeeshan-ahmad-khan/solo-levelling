import React, { createContext, useContext } from "react";
import { useTasks } from "../hooks/useTasks"; // We will move the useTasks hook here

// Create the context
const TasksContext = createContext<ReturnType<typeof useTasks> | undefined>(
  undefined
);

// Create the Provider component
export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tasksData = useTasks(); // This contains our state and all logic functions

  return (
    <TasksContext.Provider value={tasksData}>{children}</TasksContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};
