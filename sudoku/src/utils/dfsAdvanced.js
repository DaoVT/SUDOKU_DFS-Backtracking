import { isValidSudoku } from "./validate";

// đếm
let nodes = 0;
let backtracks = 0;

function isValid(board, row, col, num) {
  // row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // col
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) {
        return false;
      }
    }
  }

  return true;
}

function dfs(board) {
  nodes++;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {

      if (board[r][c] === null) {

        for (let num = 1; num <= 9; num++) {

          if (isValid(board, r, c, num)) {
            board[r][c] = num;

            if (dfs(board)) return true;

            // backtrack
            board[r][c] = null;
            backtracks++;
          }
        }

        return false;
      }
    }
  }

  return true;
}

export function solveWithStats(board) {
  nodes = 0;
  backtracks = 0;

  const start = performance.now();

  const newBoard = board.map(row => [...row]);

  dfs(newBoard);

  const end = performance.now();

  return {
    solution: newBoard,
    stats: {
      time_elapsed: end - start,
      nodes_visited: nodes,
      backtrack_counts: backtracks
    }
  };
}