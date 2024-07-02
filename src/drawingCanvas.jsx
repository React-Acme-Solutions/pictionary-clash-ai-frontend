import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { establishConnection, create, join, start, draw, guess, test } from './services/socket';
import { io } from 'socket.io-client';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);

  establishConnection(io);

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
				<button onClick={create}>Create</button>
				<button onClick={join}>Join</button>
				<button onClick={start}>Start</button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
