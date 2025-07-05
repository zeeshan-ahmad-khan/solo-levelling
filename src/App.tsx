import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TasksProvider } from "./context/TasksContext";
import HomeScreen from "./pages/HomeScreen";
import TaskDetailPage from "./pages/TaskDetailPage"; // We will create this next
import "./App.css";

const App: React.FC = () => {
  return (
    // The TasksProvider makes our tasks state available to all routes
    <TasksProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Route 1: The Home Screen */}
            <Route path="/" element={<HomeScreen />} />

            {/* Route 2: The Task Detail Screen with a dynamic ID */}
            <Route path="/task/:taskId" element={<TaskDetailPage />} />
          </Routes>
        </div>
      </Router>
    </TasksProvider>
  );
};

export default App;
