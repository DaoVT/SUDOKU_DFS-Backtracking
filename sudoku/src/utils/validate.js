export const isValidSudoku = (board) => {
  // check rows
  for (let r = 0; r < 9; r++) {
    const seen = new Set();
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val == null) continue;
      if (seen.has(val)) return false;
      seen.add(val);
    }
  }

  // check cols
  for (let c = 0; c < 9; c++) {
    const seen = new Set();
    for (let r = 0; r < 9; r++) {
      const val = board[r][c];
      if (val == null) continue;
      if (seen.has(val)) return false;
      seen.add(val);
    }
  }

  // check 3x3 boxes
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const seen = new Set();

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const val = board[br * 3 + r][bc * 3 + c];
          if (val == null) continue;
          if (seen.has(val)) return false;
          seen.add(val);
        }
      }
    }
  }

  return true;
};