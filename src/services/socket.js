'use strict';

const SERVER_URL = 'http://localhost:3000';
const io = require('socket.io-client');
const socket = io.connect(SERVER_URL);

const game = {
  ID: null,
  players: null,
  drawer: null,
  word: null,
  canvas: null,
  scores: {}
}

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('error', (message) => {
  console.log('ERROR:', message);
});

socket.on('player-list', (payload) => {
  if (game.players) {
    console.log('New player joined:', payload.newPlayer);
  }
  game.players = payload.list;
});

socket.on('game-started', () => {
  console.log('Game Starting');
});

socket.on('new-round', (drawer) => {
  console.log(`New round. ${drawer} is drawing.`);
});

socket.on('draw', (word) => {
  console.log('You are drawing. Your word is:', word);
});

socket.on('canvas-update', (canvas) => {
  if (word === null) {
    game.canvas = canvas;
  }
});

socket.on('correct-guess', (player) => {
  console.log(player, 'guessed correctly!');
  if (game.scores[player]) {
    game.scores[player] += 2;
  } else {
    game.scores[player] = 2;
  }
  if (game.scores[drawer]) {
    game.scores[drawer] += 1;
  } else {
    game.scores[drawer] = 1;
  }
});

socket.on('incorrect-guess', (payload) => {
  console.log(`${payload.player} guessed "${payload.guess}"`);
});

socket.on('game-ended', (winner) => {
  console.log(winner, 'won!');
});

function create() {
  socket.emit('create');

  socket.on('game-created', (gameId) => {
    game.ID = gameId;
    console.log('GAME ID:', game.ID)
  });
}

function join(ID) {
  socket.emit('join', ID);
}

function start() {
  socket.emit('start-game');
}

function draw(canvas) {
  socket.emit('canvas-update', { ID: game.ID, canvas: canvas });
}

function guess(wordGuess) {
  socket.emit('make-guess', { ID: game.ID, guess: wordGuess });
}

module.exports = { game, create, join, start, draw, guess }