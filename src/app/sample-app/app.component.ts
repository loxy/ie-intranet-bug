import {AppController} from './app.controller';
import * as template from './app.component.html';
import {app} from '../module-app';
import {Component} from '../shared/component.decorator';

export class SiApp {
  @Component('si-app', app)
  static create(): angular.IComponentOptions {
    return {
      controller: AppController,
      controllerAs: 'vm',
      template: template,
    };
  }
}
