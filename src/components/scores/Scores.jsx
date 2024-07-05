import React from 'react';

const Scores = ({ text }) => {
  return (
    <div className="scores-container">
      <h2>Scores</h2>
      <p>{text}</p>
    </div>
  );
};

export default Scores;
