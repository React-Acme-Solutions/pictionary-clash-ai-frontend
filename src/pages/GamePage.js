import React, { useState } from 'react';
import DrawingCanvas from '../components/DrawingCanvas';
import CategoryFlipCard from '../components/CategoryFlipCard';
import Scoreboard from '../components/Scoreboard';
import Login from '../components/Login'; // Assuming you have a Login component
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom'; // Import Link for navigation

const socket = io('http://localhost:3000'); // Adjust the URL as needed

const GamePage = () => {
  const [username, setUsername] = useState('');
  const [categories] = useState(['Animal', 'Food', 'Object']);
  const [scores, setScores] = useState([]);

  const handleLogin = (username) => {
    setUsername(username);
    socket.emit('login', username);
  };

  const handleCategorySelect = (category) => {
    socket.emit('categorySelected', category);
  };

  socket.on('updateScores', (newScores) => {
    setScores(newScores);
  });

  return (
    <div>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <DrawingCanvas socket={socket} />
          <CategoryFlipCard categories={categories} onSelect={handleCategorySelect} />
          <Scoreboard scores={scores} />
        </>
      )}

      {/* Example link back to home */}
      <div className="back-home-link">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default GamePage;
