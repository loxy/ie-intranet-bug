import {IModule} from 'angular';
import {StateProvider} from '@uirouter/angularjs';

export function StateConfig(module: IModule) {
  return function StateConfigDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    module.config(function ($stateProvider: StateProvider) {
      'ngInject';
      $stateProvider.state(descriptor.value());
      console.debug(`[${module.name}] - state registered:`, descriptor.value());
    });
  };
}
