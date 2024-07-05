import React, { useRef, useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { establishConnection, create, join, start, draw, guess } from '../services/socket';
import { io } from 'socket.io-client';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [joinCode, setJoinCode] = useState('');
  const [guessText, setGuessText] = useState('');

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const loadCanvas = (canvas) => {
    console.log('Loading canvas:', canvas);
    canvasRef.current.loadSaveData(canvas, true);
  };

  useEffect(() => {
    establishConnection(io, loadCanvas, clearDrawing, handleSendCanvas);
  }, []);

  const handleCanvasChange = () => {
    const data = canvasRef.current.getSaveData();
    console.log('Canvas change detected:', data);
    draw(data);
  };

  const clearDrawing = () => {
    canvasRef.current.clear();
    const data = canvasRef.current.getSaveData();
    console.log('Drawing cleared:', data);
    draw(data);
  };

  const undoLast = () => {
    canvasRef.current.undo();
    const data = canvasRef.current.getSaveData();
    console.log('Undo last action:', data);
    draw(data);
  };

  const createGame = () => {
    create();
  };

  const joinGame = () => {
    join(joinCode);
  };

  const handleGuess = () => {
    guess(guessText);
    setGuessText('');
  };

  const handleSendCanvas = () => {
    const canvas = canvasRef.current.canvasContainer.childNodes[1];
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'drawing.png');
      fetch(`${SERVER_URL}/upload`, {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
    });
  };

  return (
    <div>
      <CanvasDraw
        ref={canvasRef}
        brushRadius={3}
        lazyRadius={0}
        brushColor="#fff"
        canvasWidth={800}
        canvasHeight={600}
        onChange={handleCanvasChange}
        backgroundColor='#000'
      />
      <div>
        <button onClick={clearDrawing}>Clear Drawing</button>
        <button onClick={undoLast}>Undo Last</button>
        <button onClick={createGame}>Create</button>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Enter join code"
        />
        <button onClick={joinGame}>Join</button>
        <button onClick={start}>Start</button>
      </div>
      <div>
        <input
          type="text"
          value={guessText}
          onChange={(e) => setGuessText(e.target.value)}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
