// App.js or index.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Navbar from "./components/Navbar"; // Import the Navbar component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:index" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
