import React from 'react';

const Guesses = ({ text }) => {
  return (
    <div className="guesses-container">
      <h2>Guesses</h2>
      <p>{text}</p>
    </div>
  );
};

export default Guesses;
