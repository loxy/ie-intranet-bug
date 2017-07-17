import * as angular from 'angular';
import * as robot from 'post-robot';

import {ILocationProvider, ILocationService, IRootScopeService} from 'angular';
import {StateService, UIRouter} from '@uirouter/angularjs';
import {NavigationMessage} from './shared/navigation-message.enum';
robot.CONFIG.LOG_LEVEL = 'error';

export const portal = angular.module('si.aol.portal', ['ui.router']);

portal.config(function ($sceDelegateProvider) {
  'ngInject';

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    'http://localhost:15201/**',
    'http://localhost:15202/**',
    'http://localhost:15203/**',
  ]);
});

// remove "!" prefix
portal.config(function ($locationProvider: ILocationProvider) {
  'ngInject';
  console.log('Hello World!');
  $locationProvider.hashPrefix('');
});

portal.run(function($rootScope: IRootScopeService) {
  'ngInject';

  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

portal.run(function ($state: StateService, $location: ILocationService, $window: angular.IWindowService,) {
  'ngInject';

  robot.on(NavigationMessage.APP_STATE_SUCCESS, function (event) {
    //$location.path('fsadf/dfsdfsdf/fsdf');
    // const url = `${$location.protocol()}${$location.host()}${event.data.url}`;
    //const url = `#/app/hello${event.data.url}`;
    //$window.location.replace(url);
    //$state.go('about');
    console.log('old path', $location.path());
    console.log(NavigationMessage.APP_STATE_SUCCESS, 'occured:', event.data.path);
    // $location.path('/about');
    // $location.url(event.data.url);
    console.log('new path', $location.path());
    // console.log('new path', event.source.location);
  });

});
