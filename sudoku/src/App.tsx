import { useState } from 'react';
import './App.css'
import Grid from './components/Grid'
import Controls from './components/Controls';
import { puzzles } from './data/puzzles';
import { solveWithStats } from './utils/dfsAdvanced';

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

    // lưu stats
    const [stats, setStats] = useState(null);
    
    const handleCheck = () => {
      setStatus('Use Solve to check with DFS result');
    }

    const handleReset = () => {
      setBoard(puzzle.map((row) => [...row]));
      setStatus('');
      setSelected(null);
      setGreenCount(0);
      setStats(null); 
    };

    const handleHint = () => {
      // đơn giản: dùng DFS để lấy 1 ô đúng
      const result = solveWithStats(board);
      const solution = result.solution;

      const newBoard = board.map(row => [...row]);

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (newBoard[r][c] === null) {
            newBoard[r][c] = solution[r][c];
            setBoard(newBoard);
            return;
          }
        }
      }
    };

    // DFS + stats
    const handleSolve = () => {
      const result = solveWithStats(board);

      setBoard(result.solution);
      setStats(result.stats);

      setStatus('Solved with DFS + Backtracking!');
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

      {/* HIỂN THỊ THỐNG KÊ */}
      {stats && (
        <div className="stats">
          <p>Time: {stats.time_elapsed.toFixed(2)} ms</p>
          <p>Nodes visited: {stats.nodes_visited}</p>
          <p>Backtracks: {stats.backtrack_counts}</p>
        </div>
      )}
    </div>
  )
}

export default App;