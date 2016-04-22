import Ember from 'ember';

/**
 * alert-box component
 *
 * Wrapper component for Bootstrap's alert boxes
 */
export default Ember.Component.extend({
  classNames: ['alert'],
  classNameBindings: [
    'contextCls', 
    'closeable:alert-dismissible', 
    'closeable:fade', 
    'closeable:in'
  ],
  attributeBindings: ['role'],
  role: 'alert',
  
  //valid types: info|success|warning|danger
  type: 'info',
  //displays a close button and allows the alert to be closed when true
  closeable: true,

  contextCls: Ember.computed('context', function() {
    return 'alert-' + this.get('type');
  })
});
