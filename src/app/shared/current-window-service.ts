import {portal} from '../module-portal';
import {Service} from './service.decorator';

@Service('currentWindowService', portal)
export class CurrentWindowService {
  private window: Window;

  constructor() {

  }

  set currentWindow(window: Window) {
    console.debug(`current window set changed`);
    this.window = window;
  }

  get currentWindow() {
    return this.window;
  }

}
