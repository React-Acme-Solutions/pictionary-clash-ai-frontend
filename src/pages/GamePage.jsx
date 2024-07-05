import React, { useState, useEffect } from 'react';
import Announcements from '../components/announcements/Announcements';
import Scores from '../components/scores/Scores';
import DrawingCanvas from '../components/drawingCanvas';
import Guesses from '../components/guesses/Guesses';
import AI from '../components/ai/AI';
import Login from '../components/Login'; // Assuming you have a Login component
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/GamePage.scss'; // Adjust the path if necessary
import { establishConnection, setUpdateScoresCallback, setUpdateGuessesCallback, setUpdateAnnouncementsCallback, setUpdateAiCallback } from '../services/socket';

const GamePage = () => {
  const [username, setUsername] = useState('');

  const [scores, setScores] = useState('');
  const [guesses, setGuesses] = useState('');
  const [announcements, setAnnouncements] = useState('');
  const [ai, setAi] = useState('');

  useEffect(() => {
    setUpdateScoresCallback((newScores) => {
      setScores(newScores);
    });

    setUpdateGuessesCallback((newGuess) => {
      setGuesses(newGuess);
    });

    setUpdateAnnouncementsCallback((newAnnouncement) => {
      setAnnouncements(newAnnouncement);
    });

    setUpdateAiCallback((newAi) => {
      setAi(newAi);
    })
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <div>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Announcements text={announcements} />
          <Scores text={scores} />
          <div className="drawing-canvas-container">
            <DrawingCanvas />
          </div>
          <Guesses text={guesses} />
          <AI text={ai} />
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
