import {IModule} from 'angular';
import {convertDashToCamelCase} from './convert-dash-to-camel-case';

export function Directive(selector: string, module: IModule) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    module.directive(convertDashToCamelCase(selector), descriptor.value);
  };
}
