import Ember from 'ember';
import layout from '../templates/components/mu-login';

export default Ember.Component.extend({
  layout: layout,
  session: Ember.inject.service('session'),
  classNames: ['mu-login'],
  didInsertElement() {
    Ember.$('body').addClass('login-body');
  },
  willDestroyElement() {
    Ember.$('body').removeClass('login-body');
  },
  actions: {
    login() {
      const credentials = this.getProperties('nickname', 'password');
      this.get('session').authenticate('authenticator:mu-semtech', credentials)
	.catch((reason) => {
	  var error = reason.responseJSON.errors[0].title;
	  console.log('Authentication failed: ' + error);
	  this.set('errorMessage', error);
	});
    }
  }
});