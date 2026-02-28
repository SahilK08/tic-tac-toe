import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import './App.css';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function calculateWinner(squares) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: WINNING_LINES[i] };
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('pvp'); // 'pvp' or 'pvc'
  const [statusText, setStatusText] = useState('Next player: X');
  const [winningLine, setWinningLine] = useState(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const isDraw = !winner && squares.every(s => s !== '');

  useEffect(() => {
    if (winner) {
      setStatusText(`Winner: ${winner}! 🎉`);
      setWinningLine(winnerInfo.line);
    } else if (isDraw) {
      setStatusText("It's a Draw! 🤝");
    } else {
      setStatusText(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [squares, xIsNext, winner, isDraw]);

  useEffect(() => {
    if (mode === 'pvc' && !xIsNext && !winner && !isDraw) {
      makeComputerMove();
    }
  }, [xIsNext, mode, winner, isDraw]);

  const makeComputerMove = async () => {
    setIsComputerThinking(true);
    try {
      const response = await fetch('http://localhost:8000/computer_move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board: squares }),
      });
      const data = await response.json();

      if (data.move !== -1) {
        // Add a slight delay for better UX
        setTimeout(() => {
          const nextSquares = [...squares];
          nextSquares[data.move] = 'O';
          setSquares(nextSquares);
          setXIsNext(true);
          setIsComputerThinking(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setIsComputerThinking(false);
    }
  };

  const handleClick = (i) => {
    if (squares[i] || winner || (mode === 'pvc' && !xIsNext)) return;

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
    setWinningLine(null);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'pvp' ? 'pvc' : 'pvp');
    resetGame();
  };

  return (
    <div className="app-container">
      <h1>Tic Tac Toe</h1>

      <div className="controls glass-panel">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === 'pvp' ? 'active' : ''}`}
            onClick={() => mode !== 'pvp' && toggleMode()}
          >
            👤 vs 👤
          </button>
          <button
            className={`mode-btn ${mode === 'pvc' ? 'active' : ''}`}
            onClick={() => mode !== 'pvc' && toggleMode()}
          >
            👤 vs 🤖
          </button>
        </div>

        <div className="status-badge">
          {isComputerThinking ? "Computer thinking..." : statusText}
        </div>

        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <Board squares={squares} onClick={handleClick} winningLine={winningLine} />
    </div>
  );
}

export default App;
