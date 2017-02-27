// @flow

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounce';

class DomEvent {
  onEvent: Observable;
  onEventInterval: Observable;

  constructor(props: Object) {
    this.onEvent = Observable.fromEvent(props.from, props.on)
      .subscribe(props.onFire);

    if (props.interval) {
      this.onEventInterval = Observable.fromEvent(props.from, props.on)
        .debounce(() => Observable.interval(props.interval))
        .subscribe(props.onIntervalFire);
    }
  }

  destroy() {
    if (this.onEvent) {
      this.onEvent.unsubscribe();
    }
    if (this.onEventInterval) {
      this.onEventInterval.unsubscribe();
    }
  }
}

export default DomEvent;
