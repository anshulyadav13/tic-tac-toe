import { useState } from 'react';
import { Square } from './Square';

const winnerMatrix = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const Board = () => {
    const [isXTurn, setIsXTurn] = useState(true);
    const [isDraw, setIsDraw] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState('');
    const [winningCells, setWinningCells] = useState<number[]>([]);

    const handleSquareClick = (position: number) => {
        if (squares[position] || winner) return;

        const newSquares = squares.slice();
        newSquares[position] = isXTurn ? 'X' : 'O';
        setSquares(newSquares);
        evaluateGame(newSquares);
        setIsXTurn(!isXTurn);
    };

    const evaluateGame = (squares: string[]) => {
        let gameWinner = '';
        let winningCombo: number[] = [];

        for (const [a, b, c] of winnerMatrix) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                gameWinner = squares[a];  // Either 'X' or 'O'
                winningCombo = [a, b, c];
                break;
            }
        }

        setWinner(gameWinner);
        setWinningCells(winningCombo);
        if (!gameWinner && squares.every(s => s)) setIsDraw(true);
    };

    const resetGame = () => {
        setSquares(Array(9).fill(''));
        setWinner('');
        setIsDraw(false);
        setIsXTurn(true);
        setWinningCells([]);
    };

    return (
        <div className="hero flex justify-center flex-col items-center mt-[100px]">
            <h1 className="text-green-800 font-bold-normal pb-1">
                {winner ? `${winner} is the winner` : (isXTurn ? `X's Turn` : `O's Turn`)}
            </h1>
            <h2 className="text-red-900 font-semibold">
                {isDraw ? "Match Drawn! Please restart the game." : ''}
            </h2>
            <div className="square grid grid-cols-3 gap-1 text-white">
                {squares.map((square, index) => (
                    <Square
                        key={index}
                        value={square}
                        onClick={() => handleSquareClick(index)}
                        highlight={winningCells.includes(index)}
                    />
                ))}
            </div>
            <input
                type="button"
                className="bg-green-500 mt-3 cursor-pointer text-[18px] rounded-full w-48 text-white h-15"
                value="Restart Game"
                onClick={resetGame}
            />
        </div>
    );
};

export default Board;
