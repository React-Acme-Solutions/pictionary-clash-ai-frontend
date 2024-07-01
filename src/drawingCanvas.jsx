import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

const DrawingCanvas = () => {
    const canvasRef = useRef(null);

    const saveDrawing = () => {
        const data = canvasRef.current.getSaveData();
        console.log(data);
    };

    const loadDrawing = () => {
        const data = "PASTE_SAVED_DATA_HERE"; // Replace with actual saved data
        canvasRef.current.loadSaveData(data, true);
    };

    const clearDrawing = () => {
        canvasRef.current.clear();
    };

    const undoLast = () => {
        canvasRef.current.undo();
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
            />
            <div>
                <button  onClick={saveDrawing}>Save Drawing</button>
                <button onClick={loadDrawing}>Load Drawing</button>
                <button onClick={clearDrawing}>Clear Drawing</button>
                <button onClick={undoLast}>Undo Last</button>
            </div>
        </div>
    );
};

export default DrawingCanvas;