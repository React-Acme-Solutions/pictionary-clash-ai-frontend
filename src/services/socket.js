'use strict';

let socket;
const game = {
  ID: null,
  myName: null,
  players: null,
  names: null,
  drawer: null,
  word: null,
  canvas: null,
  scores: {}
};

let updateScoresCallback = () => {};
let updateGuessesCallback = () => {};
let updateAnnouncementsCallback = () => {};
let updateAiCallback = () => {};

function establishConnection(io, loadCanvas, clearDrawing, handleSendCanvas) {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  console.log('url', SERVER_URL);
  socket = io.connect(SERVER_URL);

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('error', (message) => {
    console.log('ERROR:', message);
  });

  socket.on('player-list', (payload) => {
    if (game.players) {
      game.players = payload.list;
      console.log('New player joined:', payload.newPlayer);
    } else {
      game.players = payload.list;
      console.log('Players:', payload.list);
      updateAnnouncementsCallback('Game Joined');
    }
  });

  socket.on('names', (names) => {
    game.names = names;
  });

  socket.on('game-started', () => {
    console.log('Game Starting');
    updateAnnouncementsCallback('Game is starting!')
  });

  socket.on('new-round', (drawer) => {
    clearDrawing();
    game.drawer = false;
    console.log(`New round. ${drawer} is drawing.`);
  });

  socket.on('draw', (word) => {
    game.drawer = true;
    game.word = word;
    console.log('You are drawing. Your word is:', word);
    updateAnnouncementsCallback(`You are drawing.\nYour word is: ${word}`);
  });

  socket.on('canvas-update', (canvas) => {
    if (!game.drawer) {
      game.canvas = canvas;
      console.log('Canvas updated for drawer:', canvas);
      loadCanvas(game.canvas);
    }
  });

  socket.on('correct-guess', (player) => {
    console.log(player, 'guessed correctly!');
    if (game.scores[player]) {
      game.scores[player] += 2;
    } else {
      game.scores[player] = 2;
    }
    if (game.scores[game.drawer]) {
      game.scores[game.drawer] += 1;
    } else {
      game.scores[game.drawer] = 1;
    }
    console.log('Scores:', game.scores);
    updateScores();
    updateGuessesCallback(`${game.names[player]} guessed correctly!`);
  });

  socket.on('incorrect-guess', (payload) => {
    console.log(`${payload.player} guessed "${payload.guess}"`);
    updateGuessesCallback(`${game.names[player]} guessed "${payload.guess}"`);
  });

  socket.on('word-reveal', (word) => {
    console.log(`The word was "${word}"`);
    updateAnnouncementsCallback(`The word was "${word}"`);
  })

  socket.on('game-ended', (winner) => {
    console.log(game.names[winner], 'won!');
    updateAnnouncementsCallback(`${game.names[winner]} won the game with ${game.scores[winner]} points!`);
  });

  socket.on('send-canvas', (gameId) => {
    handleSendCanvas(gameId);
  });

  socket.on('ai-guess', (guess) => {
    console.log(`The AI guessed "${guess}"`);
    updateAiCallback(`The AI guessed that the word was ${guess}`);
  });
}

function setUpdateScoresCallback(callback) {
  updateScoresCallback = callback;
}

function setUpdateGuessesCallback(callback) {
  updateGuessesCallback = callback;
}

function setUpdateAnnouncementsCallback(callback) {
  updateAnnouncementsCallback = callback;
}

function setUpdateAiCallback(callback) {
  updateAiCallback = callback;
}

function updateScores() {
  let scoresText = '';
  for (const playerId of game.players) {
    scoresText += `${game.names[playerId]}: ${game.scores[playerId] || 0}\n`;
  }
  updateScoresCallback(scoresText);
}

function nameChoose(name) {
  game.myName = name;
}

function create() {
  socket.emit('create');

  socket.on('game-created', (gameId) => {
    game.ID = gameId;
    console.log('GAME ID:', game.ID);
    socket.emit('name-declare', { ID: game.ID, name: game.myName });
    updateAnnouncementsCallback(`Game Created. Join Code: ${game.ID}`);
  });
}

function join(ID) {
  game.ID = ID;
  socket.emit('join', ID);
  socket.emit('name-declare', { ID: game.ID, name: game.myName });
}

function start() {
  socket.emit('start-game', game.ID);
}

function draw(canvas) {
  socket.emit('canvas-update', { ID: game.ID, canvas: canvas });
  console.log('Drawing sent to server:', canvas);
}

function guess(wordGuess) {
  socket.emit('make-guess', { ID: game.ID, guess: wordGuess });
  console.log('Guess sent to server:', wordGuess);
}

function test() {
  console.log('123');
}

export { establishConnection, 
  nameChoose, 
  create, 
  join, 
  start, 
  draw, 
  guess, 
  test,
  setUpdateScoresCallback, 
  setUpdateGuessesCallback, 
  setUpdateAnnouncementsCallback,
  setUpdateAiCallback,
};
