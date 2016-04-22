import Ember from 'ember';

/**
 * sudoku-puzzle service
 *
 * Parses sudoku puzzles and solves them
 */
export default Ember.Service.extend({
  /**
   * Converts a sudoku puzzle in text format (9x9 grid of numbers and X's) into a 2D array
   *
   * @param {string} text
   * @return {array, bool}  returns false if the input text is not in the correct format 
   */
  puzzleTextToArray: function(text) {
    let grid = [];
    let data;
    let cols;
    let i;
    let j;

    if(typeof text !== 'string' || Ember.isBlank(text)) {
      return false;
    }

    data = Ember.$.trim(text).split("\n");

    if(data.length !== 9) {
      return false;
    }

    for(i = 0; i < data.length; i++) {
      let row = [];
      cols = Ember.$.trim(data[i]).split('');

      if(cols.length !== 9) {
        return false;
      }

      for(j = 0; j < cols.length; j++) {
        let cellVal;

        if(cols[j].toUpperCase() === 'X') {
          row.push({value: false, prefilled: false});
        } else {
          cellVal = parseInt(cols[j], 10);

          if(isNaN(cellVal) || cellVal < 1 || cellVal > 9) {
            return false;
          }

          row.push({value: cellVal, prefilled: true});
        }
      }

      grid.push(row);
    }

    return grid;
  },

  /**
   * Converts a sudoku puzzle in array format into a text string (9x9 grid of numbers and X's)
   *
   * @param {array} arr
   * @return {string} 
   */
  puzzleArrayToText: function(arr) {
    let text = '';

    if(!Ember.isArray(arr) || arr.length < 1) {
      return text;
    }

    arr.forEach(function(row) {
      if(!Ember.isArray(row) || row.length < 1) {
        return;
      }

      row.forEach(function(col) {
        text += col.value || 'X';
      });

      text += "\n";
    });

    return Ember.$.trim(text);
  },

  /**
   * Checks if a duplicate value exists for the given row and value, in the given grid
   *
   * @param {number} rowIndex
   * @param {number} value
   * @param {array} grid 
   * @return {bool}
   */
  rowHasDupe: function(rowIndex, value, grid) {
    let i;

    for(i = 0; i < grid[rowIndex].length; i++) {
      if(grid[rowIndex][i].value === value) {
        return true;
      }
    }

    return false;
  },

  /**
   * Checks if a duplicate value exists for the given column and value, in the given grid
   *
   * @param {number} colIndex
   * @param {number} value
   * @param {array} grid 
   * @return {bool}
   */
  colHasDupe: function(colIndex, value, grid) {
    let i;

    for(i = 0; i < grid.length; i++) {
      if(grid[i][colIndex].value === value) {
        return true;
      }
    }

    return false;
  },

  /**
   * Checks if a duplicate value exists in a region for the given cell position and value, in the
   * given grid
   *
   * @param {number} colIndex
   * @param {number} rowIndex
   * @param {number} value
   * @param {array} grid 
   * @return {bool}
   */
  regionHasDupe: function(colIndex, rowIndex, value, grid) {
    let colTop = 0;
    let rowTop = 0;
    let regionSize = 3;
    let i;
    let j;

    while(colIndex >= colTop + regionSize) {
      colTop += regionSize;
    }

    while(rowIndex >= rowTop + regionSize) {
      rowTop += regionSize;
    }

    for(i = rowTop; i < rowTop + regionSize; i++) {
      for(j = colTop; j < colTop + regionSize; j++) {
        if(grid[i][j].value === value) {        
          return true;
        }
      }
    }

    return false;
  },

  /**
   * Checks if the given value is legal for the given cell position, in the given grid
   *
   * @param {number} colIndex
   * @param {number} rowIndex
   * @param {number} value
   * @param {array} grid 
   * @return {bool}
   */
  cellIsValid: function(colIndex, rowIndex, value, grid) {
    return !this.rowHasDupe(rowIndex, value, grid) &&
      !this.colHasDupe(colIndex, value, grid) &&
      !this.regionHasDupe(colIndex, rowIndex, value, grid);
  },

  /**
   * Returns all the empty cells (cells that are not pre-filled) in the given grid
   *
   * @param {array} grid
   * @return {array}
   */
  getEmptyCells: function(grid) {
    let result = [];
    let i;
    let j;

    for(i = 0; i < grid.length; i++) {
      for(j = 0; j < grid[i].length; j++) {
        if(!grid[i][j].prefilled) {
          result.push([i, j]);
        }
      }
    }

    return result;
  },

  /**
   * Attempts to solve the given sudoku grid. Returns an object containing a `success` boolean and
   * the completed grid (if solved successfully) 
   *
   * @param {array} grid 
   * @return {object}  {success: {bool}, grid: {array}}
   */
  solve: function(grid) {
    let result = {success: false, grid: grid};
    let emptyCells = this.getEmptyCells(grid);
    let limit = 9;
    let row;
    let col;
    let i;
    let value;
    let cellIsValid;

    for(i = 0; i < emptyCells.length;) {
      row = emptyCells[i][0];
      col = emptyCells[i][1];
      value = (!result.grid[row][col].value ? 0 : result.grid[row][col].value) + 1;
      cellIsValid = false;

      while(!cellIsValid && value <= limit) {
        if(this.cellIsValid(col, row, value, result.grid)) {
          cellIsValid = true;
          Ember.set(result.grid[row][col], 'value', value);
          i++;
        } else {
          value++;
        }
      }

      if(!cellIsValid) {
        Ember.set(result.grid[row][col], 'value', 0);
        i--;

        //if trying to move backwards from the 1st cell, there is no solution
        if(i < 0) {
          break;
        }
      }
    }

    //puzzle was successfully solved if all empty cells were filled in with a legal value
    result.success = (i === emptyCells.length);

    return result;
  }
});
