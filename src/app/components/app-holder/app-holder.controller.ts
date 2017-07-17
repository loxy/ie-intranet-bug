import * as robot from 'post-robot';
import {StateParams} from '@uirouter/angularjs';
import {IController} from 'angular';
import {NavigationCommand} from '../../shared/navigation-command.enum';
import {CurrentWindowService} from '../../shared/current-window-service';

export class AppHolderController implements IController {
  src: string;
  uid = Math.random() * 10e6;

  constructor(private $stateParams: StateParams,
              private currentWindowService: CurrentWindowService) {
    'ngInject';
  }

  $onInit() {
    console.debug(`[AppHolderController] - try to load: ${this.src}`);
  }

  onApplicationLoad(contentWindow: Window) {
    console.debug(`[AppHolderController] - ${this.src} completely loaded`);
    this.currentWindowService.currentWindow = contentWindow;
    robot
      .send(contentWindow, NavigationCommand.TRY_TO_NAVIGATE, {url: '/' + this.$stateParams.tail})
      .then(function (event) {
          console.log('received:', event);
        })
      .catch(function (err) {
        console.error(`[AppHolderController] - ${NavigationCommand.TRY_TO_NAVIGATE} failed:`, err);
      });
  }
}
