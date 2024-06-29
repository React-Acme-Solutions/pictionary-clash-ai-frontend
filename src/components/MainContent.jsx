// src/components/Front/MainContent.jsx

import React from "react";
import FlipCard from "./CategoryFlipCard"; // Import FlipCard component if defined separately

const MainContent = () => {
  return (
    <div className="main-content-container">
      <div className="larger-container-placeholder">
        {/* Larger container placeholder content */}
        <h2>Larger Container Placeholder</h2>
        <p>This is the larger container content.</p>
      </div>
      <div className="smaller-containers">
        {/* Three smaller containers for flip cards */}
        <FlipCard />
        <FlipCard />
        <FlipCard />
      </div>
    </div>
  );
};

export default MainContent;
