import Ember from 'ember';

/**
 * file-input-btn component
 *
 * A file input styled as a button, that allows the selected file to be read into memory
 */
export default Ember.Component.extend({
  tagName: 'label',
  classNames: ['file-input', 'btn'],
  classNameBindings: ['btn-classes'],
  attributeBindings: ['accept'],
  supportsFileApi: true,
  //css classes to apply to the button element
  'btn-classes': 'btn-secondary',
  //when set to true, the selected file will be read into memory as text
  'read-file-as-text': false,
  //specify a list of allowed file/MIME types
  accept: '',

  onInit: Ember.on('init', function() {
    this.set('supportsFileApi', (window.File && window.FileReader && window.FileList && window.Blob));
  }),

  readFile: function(file) {
    let self = this;
    let reader = new FileReader();

    reader.onerror = function() {
      if(self.get('on-read-file')) {
        self.get('on-read-file')(false);
      }
    };

    reader.onload = function(event) {
      if(self.get('on-read-file')) {
        self.get('on-read-file')(true, file.name, event.target.result);
      }
    };

   reader.readAsText(file);
  },

  actions: {
    fileChange: function(files) {
      if(this.get('on-change')) {
        this.get('on-change')(files);
      }

      if(this.get('supportsFileApi') && this.get('read-file-as-text') && files && files.length > 0) {
        this.readFile(files[0]);
      }
    }
  }
});
