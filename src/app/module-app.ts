import * as angular from 'angular';
import {ILocationProvider, ILocationService, IRootScopeService} from 'angular';
import * as robot from 'post-robot';
import {StateService, TransitionService, Transition} from '@uirouter/angularjs';
import {NavigationCommand} from './shared/navigation-command.enum';
import {NavigationMessage} from './shared/navigation-message.enum';
robot.CONFIG.LOG_LEVEL = 'error';

export const appName = 'si.aol.app';
export const app = angular.module(appName, ['ui.router']);

// remove "!" prefix
app.config(function ($locationProvider: ILocationProvider) {
  'ngInject';

  $locationProvider.hashPrefix('');
});

app.run(function($rootScope: IRootScopeService) {
  'ngInject';

  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

app.run(function ($transitions: TransitionService,
                  $window: angular.IWindowService,
                  $location: ILocationService) {
  'ngInject';

  console.log(`[${appName}] - registering transition hooks`);

  $transitions.onSuccess({}, function (trans: Transition) {
    console.log(`[${appName}] - transition: onSuccess`);
    if ($window && $window.top !== $window) {
      console.log(`[${appName}] - sending: ${NavigationMessage.APP_STATE_SUCCESS}`);
      robot
        .send($window.top, NavigationMessage.APP_STATE_SUCCESS, {state: trans.to(), absUrl: $location.absUrl(), path: $location.path(), url: $location.url()})
        .then(function (event) {
          console.log('URL changed in Portal:', event);
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  });

});

app.run(function ($state: StateService, $location: ILocationService, $rootScope: IRootScopeService) {
  'ngInject';

  console.log(`[${appName}] - registering post message hooks`);

  robot.on(NavigationCommand.TRY_TO_NAVIGATE, function (event, callback) {
    console.log(`[${appName}] - ${NavigationCommand.TRY_TO_NAVIGATE} occured:`, event, $location);
    console.log('We are at URL:', $location.url(), 'and state:', $state.current);
    console.log(`[${appName}] - trying to navigate to:`, event.data.url);
    $location.url(event.data.url);
    $rootScope.$apply();
  });

});
