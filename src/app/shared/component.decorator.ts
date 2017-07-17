import {IModule} from 'angular';
import {convertDashToCamelCase} from './convert-dash-to-camel-case';

export function Component(selector: string, module: IModule) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    module.component(convertDashToCamelCase(selector), descriptor.value());
  };
}
