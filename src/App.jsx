import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import FrontPage from "./components/Front/Front-Page";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import "./styles/global-styles.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          {/* Add additional routes as needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
