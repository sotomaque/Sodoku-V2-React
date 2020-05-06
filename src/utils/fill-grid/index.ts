import { GRID, NUMBERS } from 'typings';
import { 
  checkGrid,
  identifySquare, 
  isInCol, 
  isInRow, 
  isInSquare, 
  shuffle 
} from 'utils';


const numbers: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * A backgracking / recursive function to check all possible
 * combinations of numbers until a solution is found
 *
 * @param grid 9x9 Soduku grid
 */
function fillGrid(grid: GRID) {
  let row = 0;
  let col = 0;

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    if (grid[row][col] === 0) {
      shuffle(numbers);

      for (let value of numbers) {
          if (!isInRow({ grid, row, value })) {
            if (!isInCol({ grid, col, value })) {
                const square = identifySquare({ grid, row, col })
                if (!isInSquare({ square, value })) {
                  grid[row][col] = value;
                  // check grid if it is full; if yes, stop and return
                  if (checkGrid(grid)) return true
                  // otherwise we run fillGrid(grid)
                  else if (fillGrid(grid)) return true
                }               
            }
          }
      }
      break;
    }
  }

  grid[row][col] = 0;
}

export default fillGrid;
