### PictureClashAI


### User Story 1: Drawing and Guessing
**Tasks:**
1. Implement a drawing canvas component for players to draw on.
2. Enable real-time updates of the drawing for all connected players using WebSocket communication.
3. Set up a timer for the guessing phase to limit the time players have to make their guesses.

### User Story 2: Submitting Guesses
**Tasks:**
1. Create a text input component for players to submit their guesses.
2. Implement logic to compare submitted guesses with the correct answer (the drawing).
3. Provide feedback to players indicating whether their guess was correct.

### User Story 3: AI Guessing
**Tasks:**
1. Integrate the OpenAI API for image recognition to analyze the completed drawings.
2. Send the drawing to OpenAI for analysis.
3. Retrieve and display the AI's guess based on the drawing.
4. Compare the AI's guess with the guesses submitted by players.

These tasks cover the core functionalities of your game app. Each task involves both frontend (React Native) and backend (server-side, possibly using Node.js or another technology) development aspects. If you need detailed guidance on any specific task or technology, feel free to ask!

### UML

    ---------------------------------------------
    |                Pictionary Game             |
    ---------------------------------------------
    | - drawingCanvas: DrawingCanvas             |
    | - guessInput: GuessInput                   |
    | - aiGuessDisplay: AIGuessDisplay           |
    ---------------------------------------------
    | + startGame()                             |
    | + submitGuess(guess: string)               |
    | + sendDrawingToAI()                       |
    ---------------------------------------------
    
    ---------------------------------------------
    |              DrawingCanvas                |
    ---------------------------------------------
    | - canvas: Canvas                          |
    ---------------------------------------------
    | + drawLine(x1, y1, x2, y2)                 |
    | + clearCanvas()                           |
    ---------------------------------------------
    
    ---------------------------------------------
    |               GuessInput                  |
    ---------------------------------------------
    | - inputField: TextInput                   |
    ---------------------------------------------
    | + getGuess(): string                      |
    ---------------------------------------------
    
    ---------------------------------------------
    |              AIGuessDisplay               |
    ---------------------------------------------
    | - aiGuess: string                         |
    ---------------------------------------------
    | + setAIGuess(guess: string)               |
    ---------------------------------------------
