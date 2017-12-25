import Rx from 'rx';
import initalState from './state';
import Render from './Render';
import { KEYCODE } from './constants';

class Controller {
  constructor(renderer) {
    let pixiRender = new Render(initalState, renderer)

    const keydown$ = Rx.Observable
      .fromEvent(document, 'keydown', e => {
        switch (e.keyCode) {
          case KEYCODE.left:
            return  -1
          case KEYCODE.right:
            return 1
          default:
        }
      });

    const keyup$ = Rx.Observable
      .fromEvent(document, 'keyup', e => {
        switch (e.keyCode) {
          case KEYCODE.left:
            return  -1
          case KEYCODE.right:
            return 1
          default:
        }
      })
      .withLatestFrom(keydown$)
      .filter(([keyup, keydown]) => {
        return keyup === keydown
      })
      .map(x => 0)

    const input$ = Rx.Observable
      .merge(keydown$, keyup$)
      .startWith(0)
      .distinctUntilChanged();

    const ticker$ = Rx.Observable
      .interval(0, Rx.Scheduler.requestAnimationFrame)

    const state$ = ticker$
      .withLatestFrom(input$)
      .scan(({kp}, [ticker, input]) => {
        switch (input) {
          case -1:
            kp.vx = -1;
            kp.side = 'LEFT';
            kp.ani = 'RUN';
            break;
          case 1:
            kp.vx = 1;
            kp.side = 'RIGHT';
            kp.ani = 'RUN';
            break;
          case 0:
            kp.vx = 0;
            kp.ani = 'STAND';
            break;
          default:
        }

        return {kp}
      }, initalState)

    ticker$
    .withLatestFrom(state$)
    .subscribe(([ticker, state]) => {
      pixiRender.render(state, renderer)
    })
  }
}

export default Controller;
