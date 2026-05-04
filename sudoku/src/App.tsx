import { useState } from 'react';
import './App.css'
import Grid from './components/Grid'
import Controls from './components/Controls';
import { puzzles } from './data/puzzles';
import { isValidSudoku } from './utils/validate';
import { solveSudoku } from './utils/solve';

function App() {
    const [puzzle, setPuzzle] = useState(puzzles.easy[0]);
    const [board, setBoard] = useState(puzzles.easy[0].map(row => [...row]));
    const [difficulty, setDifficulty] = useState('easy');
    const [solution, setSolution] = useState(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(null))
    );
    const [status, setStatus] = useState('');

    //[row, col]
    const [selected, setSelected] = useState(null);

    const [greenCount, setGreenCount] = useState(0);
    
    const handleCheck = () => {
      const flatBoard = board.flat();
      const flatSolution = solution.flat();

      if (flatBoard.every((cell,i) => cell === flatSolution[i])) {
        setStatus('Correct!');

        let count = 0;
        const totalCells = 81;
        const interval = setInterval(() => {
          count++;
          setGreenCount(count);
          if (count === totalCells) clearInterval(interval);
        },30)
      } else {
        setStatus('Incorrect, try again.')
        setGreenCount(0);
      }
    }

    const handleReset = () => {
      setBoard(puzzle.map((row) => [...row]));
      setStatus('');
      setSelected(null);
      setGreenCount(0);
    };

    const handleHint = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === null) {
            const newBoard = board.map(row => [...row]);

        // tạm thời random số hợp lệ (nếu chưa có solver)
            for (let num = 1; num <= 9; num++) {
              newBoard[r][c] = num;
              setBoard(newBoard);
              return;
            }
          }
        }
      }
    };

    const handleSolve = () => {
      const newBoard = board.map(row => [...row]);

      const result = solveSudoku(newBoard);
      
      if (result.isSolved) {
        setBoard(result.board);
        console.log(`Solved! Time: ${result.stats.time_elapsed.toFixed(2)}ms, Nodes: ${result.stats.nodes_visited}, Backtracks: ${result.stats.backtrack_counts}`);
        setStatus('Solved successfully!');
      } else {
        setStatus('No solution exists!');
      }
    };

    const handleInput = (rIdx, cIdx, value) => {
      if (value === "" || (value >=1 && value <=9)) {
        setBoard((prev) =>
          prev.map((row, r) =>
            row.map((cell, c) => {
              if (r === rIdx && c === cIdx) {
                return value ? parseInt(value) : null;
              }
              return cell;
            })
          )
        );
      }
    
    };
    const getRandomPuzzle = (level: string) => {
      const list = puzzles[level.toLowerCase()];
      const randomIndex = Math.floor(Math.random() * list.length);
      const newPuzzle = list[randomIndex];

      setPuzzle(newPuzzle);
      setBoard(newPuzzle.map(row => [...row]));
      setStatus('');
      setSelected(null);
      setGreenCount(0);
    };

    const loadPuzzle = (level: string) => {
      getRandomPuzzle(level);
    };

    const handleNewGame = () => {
      getRandomPuzzle(difficulty);
    };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sudoku</h1>
      <Grid
      board={board}
      handleInput={handleInput}
      puzzle={puzzle}
      selected={selected}
      setSelected={setSelected}
      greenCount={greenCount}
      />
      <Controls 
        handleCheck={handleCheck}
        handleReset={handleReset}
        handleHint={handleHint}
        handleSolve={handleSolve}
        handleChangeDifficulty={(level) => {
          setDifficulty(level);
          loadPuzzle(level);
        }}
        handleNewGame={handleNewGame}
      />
      {status && <div className='status'>{status}</div> }
    </div>
  )
}
export default App;
