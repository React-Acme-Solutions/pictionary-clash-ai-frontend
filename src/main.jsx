import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { game, create, join, start, draw, guess, test } from './services/socket';

createRoot(document.getElementById('root')).render(<App />);
