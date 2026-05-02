export const solveSudoku = (board) => {
  let nodes_visited = 0;
  let backtrack_counts = 0;
  const startTime = performance.now();

  const isValid = (board, r, c, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === num) return false;
      if (board[i][c] === num) return false;
    }
    let startR = Math.floor(r / 3) * 3;
    let startC = Math.floor(c / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startR + i][startC + j] === num) return false;
      }
    }
    return true;
  };

  const solve = () => {
    nodes_visited++;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num)) {
              board[r][c] = num;
              
              if (solve()) {
                return true;
              }
              
              // Backtracking step
              board[r][c] = null;
              backtrack_counts++;
            }
          }
          return false; // Trigger backtrack
        }
      }
    }
    return true; // Solved
  };

  const isSolved = solve();
  const time_elapsed = performance.now() - startTime;

  return {
    isSolved,
    board,
    stats: {
      time_elapsed,
      nodes_visited,
      backtrack_counts
    }
  };
};
