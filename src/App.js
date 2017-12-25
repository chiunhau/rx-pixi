import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import Controller from './pixi/Controller';
import loader from './pixi/loader';

class App extends Component {
  componentDidMount() {
    const renderer = new PIXI.autoDetectRenderer({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1c3192,
      roundPixels: true
    });

    document.getElementById('pixi').appendChild(renderer.view);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    loader.load(() => {
      new Controller(renderer)
    })
  }
  render() {
    return (
      <div className="App">
        <div id="pixi"></div>
      </div>
    );
  }
}

export default App;
