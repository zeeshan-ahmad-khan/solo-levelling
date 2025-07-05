import { LevelingTask } from "../types";

// In a real app, you'd use a library like 'uuid' to generate unique IDs
// For now, we'll just use strings.

export const MOCK_TASKS: LevelingTask[] = [
  {
    id: "task-1",
    title: "Learn Advanced React",
    level: 3,
    currentPoints: 45,
    pointsForNextLevel: 150, // User might have customized this
    subTodos: [
      {
        id: "sub-1-1",
        text: "Master useEffect hook",
        points: 30,
        completed: true,
      },
      {
        id: "sub-1-2",
        text: "Understand Context API",
        points: 40,
        completed: true,
      },
      {
        id: "sub-1-3",
        text: "Build a project with Redux",
        points: 80,
        completed: false,
      },
      {
        id: "sub-1-4",
        text: "Explore React Query",
        points: 50,
        completed: false,
      },
    ],
  },
  {
    id: "task-2",
    title: "Complete Fitness Goals",
    level: 5,
    currentPoints: 95,
    pointsForNextLevel: 100, // Using the default
    subTodos: [
      { id: "sub-2-1", text: "Run 5km", points: 25, completed: true },
      {
        id: "sub-2-2",
        text: "Go to the gym 3 times",
        points: 50,
        completed: true,
      },
      {
        id: "sub-2-3",
        text: "Meal prep for the week",
        points: 25,
        completed: true,
      },
      {
        id: "sub-2-4",
        text: "Try a new yoga class",
        points: 20,
        completed: false,
      },
    ],
  },
  {
    id: "task-3",
    title: '"Levelling" App UI',
    level: 1,
    currentPoints: 15,
    pointsForNextLevel: 100,
    subTodos: [
      {
        id: "sub-3-1",
        text: "Design the Task Card component",
        points: 15,
        completed: true,
      },
      {
        id: "sub-3-2",
        text: "Create the progress bar",
        points: 20,
        completed: false,
      },
      {
        id: "sub-3-3",
        text: "Choose a color palette",
        points: 10,
        completed: false,
      },
    ],
  },
];
