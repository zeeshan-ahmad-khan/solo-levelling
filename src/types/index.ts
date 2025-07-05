/**
 * ============================================
 * DATA MODELS
 * ============================================
 */
export interface SubTodo {
  id: string;
  text: string;
  points: number;
  completed: boolean;
}

export interface LevelingTask {
  id: string;
  title: string;
  level: number;
  currentPoints: number;
  pointsForNextLevel: number;
  subTodos: SubTodo[];
}

/**
 * ============================================
 * COMPONENT PROPS
 * ============================================
 */

export interface ProgressProps {
  currentValue: number;
  maxValue: number;
}

export interface AddTaskFormProps {
  onAddTask: (title: string, points: number) => void;
}

export interface AddSubTodoFormProps {
  onAddSubTodo: (text: string, points: number) => void;
}

// This is now much simpler!
export interface LevelingTaskCardProps {
  task: LevelingTask;
  isDetailPage?: boolean;
}

// This is now the consistent, correct version
export interface SubTodoListProps {
  taskId: string;
  subTodos: SubTodo[];
}

// This is correct
export interface SubTodoItemProps {
  subTodo: SubTodo;
  taskId: string;
}
