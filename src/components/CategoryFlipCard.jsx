// CategoryFlipCard.jsx
import React from "react";

const CategoryFlipCard = ({ categories }) => {
  // Ensure categories is defined before mapping
  if (!categories) return null; // Or handle loading state appropriately

  return (
    <div className="category-flip-card">
      {categories.map((category, index) => (
        <div key={index}>
          {/* Render category content here */}
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryFlipCard;
