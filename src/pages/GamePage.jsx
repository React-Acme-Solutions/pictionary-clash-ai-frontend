import React, { useState, useEffect } from 'react';
import DrawingCanvas from '../components/drawingCanvas';
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
          <div className="drawing-canvas-container">
            <DrawingCanvas />
          </div>
        </>
      )}

      {/* Example link back to home */}
      <div className="back-home-link">
        <Link to="/home">Back to Home</Link>
      </div>
    </div>
  );
};

export default GamePage;
