import {IModule} from 'angular';
import {convertDashToCamelCase} from './convert-dash-to-camel-case';

export function Service(name: string, module: IModule) {
  return function (constructor: Function) {
    module.service(convertDashToCamelCase(name), constructor);
  };
}
