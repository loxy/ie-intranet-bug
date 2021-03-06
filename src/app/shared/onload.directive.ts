import * as angular from 'angular';
import {IAugmentedJQuery, IScope} from 'angular';

import {portal} from '../module-portal';
import {Directive} from './directive.decorator';

/**
 * Binds a function to given HTML elements load event, for example an iframe.
 * The load event is fired when a resource and its dependent resources have finished loading.
 */
export class SiOnload {
  @Directive('si-onload', portal)
  static create(): angular.IDirective {
    'ngInject';

    return {
      scope: {
        callback: '&siOnload'
      },
      link: (scope: IScope, element: IAugmentedJQuery) => {
        const iframe = <HTMLIFrameElement>element[0];
        console.debug(`[${portal.name}] - linking onload directive`);
        // do it only once (but each time)
        element.one('load', () => {
          // The contentWindow property returns the Window object of an <iframe> element.
          // You can use this Window object to access the iframe's document and its internal DOM.
          // This attribute is read-only, but its properties can be manipulated like the global Window object.
          const contentWindow = iframe ? iframe.contentWindow : undefined;
          console.debug(`[${portal.name}] - registering on load`);
          scope.callback({
            contentWindow,
          });
        });
      },
    };
  }
}
