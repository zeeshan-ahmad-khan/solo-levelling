import { useState } from "react";
import { LevelingTask } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<LevelingTask[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingSubTodoId, setEditingSubTodoId] = useState<string | null>(null);

  const handleSubTodoToggle = (taskId: string, subTodoId: string) => {
    const newTasks = JSON.parse(JSON.stringify(tasks));
    const taskToUpdate: LevelingTask | undefined = newTasks.find(
      (task: LevelingTask) => task.id === taskId
    );
    if (!taskToUpdate) return;
    const subTodoToUpdate = taskToUpdate.subTodos.find(
      (sub: { id: string }) => sub.id === subTodoId
    );
    if (!subTodoToUpdate) return;

    subTodoToUpdate.completed = !subTodoToUpdate.completed;

    if (subTodoToUpdate.completed) {
      taskToUpdate.currentPoints += subTodoToUpdate.points;
      while (taskToUpdate.currentPoints >= taskToUpdate.pointsForNextLevel) {
        taskToUpdate.currentPoints -= taskToUpdate.pointsForNextLevel;
        taskToUpdate.level += 1;
      }
    } else {
      taskToUpdate.currentPoints -= subTodoToUpdate.points;
      while (taskToUpdate.currentPoints < 0 && taskToUpdate.level > 1) {
        const previousLevelPointValue = taskToUpdate.pointsForNextLevel;
        taskToUpdate.level -= 1;
        taskToUpdate.currentPoints += previousLevelPointValue;
      }
      if (taskToUpdate.currentPoints < 0) {
        taskToUpdate.currentPoints = 0;
      }
    }
    setTasks(newTasks);
  };

  const addTask = (title: string, points: number) => {
    if (!title.trim()) return;
    const newTask: LevelingTask = {
      id: `task-${Date.now()}`,
      title: title,
      level: 1,
      currentPoints: 0,
      pointsForNextLevel: isNaN(points) || points <= 0 ? 100 : points,
      subTodos: [],
    };
    setTasks([newTask, ...tasks]);
  };

  const addSubTodo = (taskId: string, text: string, points: number) => {
    if (!text.trim()) return;
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newSubTodo = {
          id: `sub-${Date.now()}`,
          text: text,
          points: isNaN(points) || points <= 0 ? 10 : points,
          completed: false,
        };
        return { ...task, subTodos: [...task.subTodos, newSubTodo] };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  // vvv THIS IS THE CORRECTED FUNCTION vvv
  const deleteSubTodo = (taskId: string, subTodoId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Find the sub-todo that will be deleted to check its status
        const subTodoToDelete = task.subTodos.find(
          (sub) => sub.id === subTodoId
        );
        if (!subTodoToDelete) return task; // Sub-todo not found, do nothing

        let newCurrentPoints = task.currentPoints;
        let newLevel = task.level;

        // If the sub-todo was completed, we need to subtract its points
        if (subTodoToDelete.completed) {
          newCurrentPoints -= subTodoToDelete.points;

          // Re-use our de-leveling logic
          while (newCurrentPoints < 0 && newLevel > 1) {
            const previousLevelPointValue = task.pointsForNextLevel;
            newLevel -= 1;
            newCurrentPoints += previousLevelPointValue;
          }

          // Clamp at 0 if still negative (e.g., at level 1)
          if (newCurrentPoints < 0) {
            newCurrentPoints = 0;
          }
        }

        // Now, create the new sub-todos list without the deleted one
        const updatedSubTodos = task.subTodos.filter(
          (sub) => sub.id !== subTodoId
        );

        // Return the task with all properties updated
        return {
          ...task,
          subTodos: updatedSubTodos,
          currentPoints: newCurrentPoints,
          level: newLevel,
        };
      }
      return task;
    });

    setTasks(newTasks);
  };

  const editTaskTitle = (taskId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(newTasks);
    setEditingTaskId(null);
  };

  const editSubTodo = (
    taskId: string,
    subTodoId: string,
    newText: string,
    newPoints: number
  ) => {
    if (!newText.trim()) return;
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubTodos = task.subTodos.map((sub) => {
          if (sub.id === subTodoId) {
            return {
              ...sub,
              text: newText,
              points: isNaN(newPoints) || newPoints <= 0 ? 10 : newPoints,
            };
          }
          return sub;
        });
        return { ...task, subTodos: updatedSubTodos };
      }
      return task;
    });
    setTasks(newTasks);
    setEditingSubTodoId(null);
  };

  return {
    tasks,
    editingTaskId,
    editingSubTodoId,
    handleSubTodoToggle,
    addTask,
    addSubTodo,
    deleteTask,
    deleteSubTodo,
    setEditingTaskId,
    editTaskTitle,
    setEditingSubTodoId,
    editSubTodo,
  };
};
