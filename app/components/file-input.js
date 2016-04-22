import Ember from 'ember';

/**
 * file-input component
 *
 * A simple wrapper component for file inputs that listens for the input's change event
 */
export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['type', 'accept'],
  type: 'file',
  accept: null,

  change: function(event) {
    if(this.get('on-change')) {
      this.get('on-change')(event.target.files);
    }
  }
});
