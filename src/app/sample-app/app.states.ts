import {app} from '../module-app';

export default app.config(function($stateProvider) {
  'ngInject';

  console.log('Configuring app states');

  const xState = {
    name: 'x',
    url: '/x',
    template: '<h3>X</h3>'
  };

  const yState = {
    name: 'y',
    url: '/y',
    template: '<h3>Y</h3>'
  };

  const zState = {
    name: 'z',
    url: '/z',
    template: '<h3>Z</h3>'
  };

  $stateProvider.state(xState);
  $stateProvider.state(yState);
  $stateProvider.state(zState);
});
