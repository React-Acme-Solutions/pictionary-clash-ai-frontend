'use strict';

const SERVER_URL = 'http://localhost:3000';
const io = require('socket.io-client');
const socket = io.connect(SERVER_URL);

socket.on('connect', () => {
  console.log('Connected to server');
});