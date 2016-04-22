import Ember from 'ember';

/**
 * sudoku-grid component
 *
 * Renders a 9x9 sudoku puzzle grid
 */
export default Ember.Component.extend({
  classNames: ['sudoku-grid'],
  grid: [],
  numRows: 9,
  numCols: 9,

  onInit: Ember.on('init', function() {
    //create an empty grid if none is provided
    if(Ember.isEmpty(this.get('grid'))) {
      this.buildGridCells();
    }
  }),

  onGridChange: Ember.observer('grid', function() {
    //make sure the grid is never empty
    if(Ember.isEmpty(this.get('grid'))) {
      this.buildGridCells();
    }
  }),

  buildGridCells: function() {
    let grid = [];
    let i;
    let j;

    for(i = 0; i < this.get('numRows'); i++) {
      let row = [];

      for(j = 0; j < this.get('numCols'); j++) {
        row.push({value: false, prefilled: false});
      }

      grid.push(row);
    }

    this.set('grid', grid);
  }
});
