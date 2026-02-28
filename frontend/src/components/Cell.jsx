import React from 'react';
import './Cell.css';

const Cell = ({ value, onClick, winningCell }) => {
    return (
        <button
            className={`cell ${value === 'X' ? 'x-mark' : value === 'O' ? 'o-mark' : ''} ${winningCell ? 'winning' : ''}`}
            onClick={onClick}
            disabled={value !== ''}
        >
            <span className="cell-content">{value}</span>
        </button>
    );
};

export default Cell;
