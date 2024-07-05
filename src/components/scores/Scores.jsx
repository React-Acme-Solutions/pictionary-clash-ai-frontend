import React from 'react';

const Scores = (text) => {
  console.log('text:', text);
  return (
    <div className="scores-container">
      <h2>Scores</h2>
      <p>{text.text}</p>
    </div>
  );
};

export default Scores;
