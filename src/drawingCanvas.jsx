import React, { useRef, useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { establishConnection, create, join, start, draw, guess, test } from './services/socket';
import { io } from 'socket.io-client';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [joinCode, setJoinCode] = useState('');
  const [guessText, setGuessText] = useState('');

  const loadCanvas = (canvas) => {
    canvasRef.current.loadSaveData(canvas, true);
  };

  useEffect(() => {
    establishConnection(io, loadCanvas);
  }, []);

  const handleCanvasChange = () => {
    const data = canvasRef.current.getSaveData();
    draw(data);
  };

  const clearDrawing = () => {
    canvasRef.current.clear();
    const data = canvasRef.current.getSaveData();
    draw(data);
  };

  const undoLast = () => {
    canvasRef.current.undo();
    const data = canvasRef.current.getSaveData();
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

  return (
    <div>
      <CanvasDraw
        ref={canvasRef}
        brushRadius={2}
        lazyRadius={0}
        brushColor="#000"
        canvasWidth={800}
        canvasHeight={600}
        onChange={handleCanvasChange}
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
