import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ squares, onClick, winningLine }) => {
    return (
        <div className="board glass-panel">
            {squares.map((square, i) => (
                <Cell
                    key={i}
                    value={square}
                    onClick={() => onClick(i)}
                    winningCell={winningLine && winningLine.includes(i)}
                />
            ))}
        </div>
    );
};

export default Board;
