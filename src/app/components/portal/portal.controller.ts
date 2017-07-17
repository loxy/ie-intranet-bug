import {ILocationService} from 'angular';
export class PortalController {
  test = 'test';

  constructor(private $location: ILocationService) {
    'ngInject';
  }

  changeLocation() {
    this.$location.path('/app/hello/x');
  }
}
