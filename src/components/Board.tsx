import { useState } from 'react'
import { Square } from './Square'
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

    const handleSquareClick = (position: number) => {
        console.log(position)
        if (squares[position] || winner) return;

        const newSquares = squares.slice();
        newSquares[position] = (isXTurn ? 'X' : "O")
        setSquares(newSquares);
        setIsXTurn(!isXTurn);
        evaluateGame(newSquares);

    }

    const evaluateGame = (squares: string[]) => {
        let winner = '';

        for (const [a, b, c] of winnerMatrix) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                winner = squares[a];  // Either 'X' or 'O'
                break;
            }
        }

        setWinner(winner);
        if (!winner && squares.every(s => s)) setIsDraw(true);

    };

    const resetGame = () => {
        {
            setSquares(Array(9).fill(''));
            setWinner('');
            setIsDraw(false);
            setIsXTurn(true);
        }
    };

    return (
        <div className="hero flex justify-center flex-col items-center mt-[100px]">

            <h1 className='text-green-800 font-bold-normal pb-1'>{winner && `${winner}: is winner`}</h1>

            <h2 className='text-red-900 font-semibold'>{isDraw ? "Match Drawn! please restart the game." : ''}</h2>

            <div className="square grid grid-cols-3 gap-1 text-white">
                {
                    squares.map((square, index) => (
                        <Square value={square} onClick={() => handleSquareClick(index)} />
                    ))
                }

            </div>
            <input type='button' className='bg-red-400 mt-3 text-[13px] rounded-full w-[100px] text-white h-[40px]' value='Restart Game' onClick={resetGame} />

        </div>
    )
}


/**
 [1,2,3],[1,5,9],[1,4,7],[2,5,8],[3,6,7],[3,5,7],[4,5,6],[7,8,9]
**/
export default Board