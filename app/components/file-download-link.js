import Ember from 'ember';

/**
 * file-download-link component
 *
 * Creates an anchor tag that links to a download of an in-memory file Blob
 */
export default Ember.Component.extend({
  tagName: 'a',
  attributeBindings: ['download', 'target'],
  target: '_blank',
  //must be a Blob reference
  blob: null,
  //specify a filename to force the browser to download the linked file
  download: null,

  onBlobChange: Ember.observer('blob', function() {
    this.createObjUrl(this.get('blob'));
  }),

  onInsert: Ember.on('didInsertElement', function() {
    this.createObjUrl(this.get('blob'));
  }),

  createObjUrl: function(blob) {
    if(blob && window.URL && window.URL.createObjectURL) {
      this.$().prop('href', window.URL.createObjectURL(blob));
    }
  }
});
