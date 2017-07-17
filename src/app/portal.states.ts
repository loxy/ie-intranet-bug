import {StateProvider} from '@uirouter/angularjs';
import {portal} from './module-portal';

export default portal.config(function ($stateProvider: StateProvider) {
  'ngInject';

  console.log('Configuring portal states');

  const aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>This is a page of the portal!</h3>'
  };

  $stateProvider.state(aboutState);
});
