import React from 'react';

const Guesses = (text) => {
  console.log('text:', text);
  return (
    <div className="guesses-container">
      <h2>Guesses</h2>
      <p>{text.text}</p>
    </div>
  );
};

export default Guesses;
