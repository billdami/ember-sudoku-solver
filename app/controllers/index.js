import Ember from 'ember';

/**
 * index controller
 *
 */
export default Ember.Controller.extend({
  //the currently rendered sudoku grid
  puzzleGrid: [],

  //whether or not a sudoku puzzle is loaded and rendered
  puzzleIsLoaded: Ember.computed.notEmpty('puzzleGrid'),

  //true while the app is working to solve a puzzle
  isSolving: false,

  //true when the currently loaded puzzle has been completed
  isSolved: false,

  //true when the loaded puzzle has been solved successfully
  solveSuccess: false,

  //a file Blob object containing the solved puzzle in text format
  solvedPuzzleBlob: null,

  //disables the "Solve" button when the current puzzle is being or has been solved
  disableSolve: Ember.computed.or('isSolving', 'isSolved'),

  //the sudoku service
  sudokuPuzzle: Ember.inject.service('sudokuPuzzle'),

  //the filename to use for the download-able puzzle solution
  solutionFilename: '',

  //an error message that is displayed when the selected file is not loaded or parsed correctly
  fileError: null,

  actions: {
    /**
     * Validates, parses and displays the loaded puzzle file
     *
     * @param {bool} success
     * @param {string} filename
     * @param {string} fileContents
     */
    loadPuzzleFile: function(success, filename, fileContents) {
      let grid;
      let filenameParts = filename.split('.');

      if(!success) {
        this.set('fileError', 'Unable to read the selected file.');
        return;
      }

      this.set('solutionFilename', filenameParts.length > 0 ? filenameParts[0] + '.sln.txt' : 'solution.txt');

      //parse the file contents
      grid = this.get('sudokuPuzzle').puzzleTextToArray(fileContents);

      if(!grid) {
        this.set('fileError', 'Sorry, the selected file is not in the correct format.');
        return;
      }

      this.set('puzzleGrid', grid);
    },

    /**
     * Solves the currently loaded puzzle
     *
     */
    solvePuzzle: function() {
      if(Ember.isEmpty(this.get('puzzleGrid'))) {
        return;
      }

      this.set('isSolving', true);

      //execute the puzzle solving process on the next run loop
      Ember.run.next(this, function() {
        let result = this.get('sudokuPuzzle').solve(this.get('puzzleGrid'));
        let resultText;

        this.setProperties({
          isSolving: false,
          isSolved: true,
          solveSuccess: result.success,
          puzzleGrid: result.grid,
        });

        if(result.success && window.Blob) {
          resultText = this.get('sudokuPuzzle').puzzleArrayToText(result.grid);
          this.set('solvedPuzzleBlob', new Blob([resultText], {type: 'text/plain'}));
        }
      });
    },

    /**
     * Clears the currently loaded puzzle, and all related messages
     *
     */
    clearPuzzle: function() {
      this.setProperties({
        isSolved: false,
        solveSuccess: false,
        solvedPuzzleBlob: null,
        fileError: null,
        puzzleGrid: []
      });
    }
  }
});
