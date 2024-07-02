// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Pictionary</h1>
      <Link to="/game">Start Game</Link>
    </div>
  );
};

export default HomePage;
