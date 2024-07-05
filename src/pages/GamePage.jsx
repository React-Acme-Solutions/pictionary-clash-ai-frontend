import React, { useState, useEffect } from 'react';
import Announcements from '../components/announcements/Announcements';
import Scores from '../components/scores/Scores';
import DrawingCanvas from '../components/drawingCanvas';
import Guesses from '../components/guesses/Guesses';
import Login from '../components/Login'; // Assuming you have a Login component
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/GamePage.scss'; // Adjust the path if necessary

const GamePage = () => {
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <div>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Announcements />
          <Scores />
          <div className="drawing-canvas-container">
            <DrawingCanvas />
          </div>
          <Guesses />
        </>
      )}

      {/* Styled button to go back to home */}
      <div className="back-home-link">
        <Link to="/home" className="styled-button">Go to Home</Link>
      </div>
    </div>
  );
};

export default GamePage;
