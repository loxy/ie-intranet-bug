import * as robot from 'post-robot';
import {Transition} from '@uirouter/core';
import {Ng1StateDeclaration} from '@uirouter/angularjs';

import {AppHolderController} from './app-holder.controller';
import * as template from './app-holder.component.html';
import {portal} from '../../module-portal';
import {StateConfig} from '../../shared/state-config.decorator';
import {NavigationCommand} from '../../shared/navigation-command.enum';
import {CurrentWindowService} from '../../shared/current-window-service';
import {Component} from '../../shared/component.decorator';

export class AppHolder {

  @Component('si-app-holder', portal)
  static create(): angular.IComponentOptions {
    return {
      controller: AppHolderController,
      controllerAs: 'vm',
      template: template,
      bindings: {
        src: '<frameUrl'
      }
    };
  }

  @StateConfig(portal)
  static configureA(): Ng1StateDeclaration {
    return {
      name: 'ext',
      url: '/ext',
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        frameUrl: function () {
          const host = 'http://localhost';
          const port = Math.floor(Math.random() * (15203 - 15201 + 1)) + 15201;
          const content = 'static/iframe-content.html';
          return `${host}:${port}/${content}`;
        }
      },
    };
  }

  @StateConfig(portal)
  static configureB(): Ng1StateDeclaration {
    return {
      name: 'ext.holder',
      url: '/appz/:app',
      component: 'siAppHolder',
      params: {app: null},
    };
  }

  @StateConfig(portal)
  static configureC(): Ng1StateDeclaration {
    return {
      name: 'ext.holder.internal',
      url: '/*tail',
      params: {tail: null},
      onEnter: function ($transition$: Transition, currentWindowService: CurrentWindowService) {
        'ngInject';

        console.log('onEnter to', $transition$.to());
        console.log('onEnter from', $transition$.from());
        console.log('with', $transition$, $transition$.params('to'), $transition$.params('from'), currentWindowService.currentWindow);

        // propagate event only when running in same app
        // because the addressed iframe will get unloaded
        // the the app holder is responsible to trigger that event
        if (currentWindowService.currentWindow && $transition$.params('to').app === $transition$.params('from').app) {
          robot.send(currentWindowService.currentWindow, NavigationCommand.TRY_TO_NAVIGATE, {url: '/' + $transition$.params().tail});
        }
      }
    };
  }

}
