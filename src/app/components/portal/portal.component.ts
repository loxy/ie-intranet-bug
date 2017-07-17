import {PortalController} from './portal.controller';
import {portal} from '../../module-portal';
import * as template from './portal.component.html';
import {Component} from '../../shared/component.decorator';

export class SiPortal {
  @Component('si-portal', portal)
  static create() {
    return {
      controller: PortalController,
      controllerAs: 'vm',
      template,
    };
  }
}
