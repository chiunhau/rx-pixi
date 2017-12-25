import * as PIXI from 'pixi.js';

class Render {
  constructor(state, renderer) {
    this.kp = new PIXI.extras.AnimatedSprite(getAnimatedTextures('kp_out_of_breath', 7));
    this.kp.animationSpeed = 0.18;
    this.kp.anis = [];
    this.kp.currentAni = 'STAND';
    this.kp.anis['STAND'] = getAnimatedTextures('kp_out_of_breath', 7);
    this.kp.anis['RUN'] = getAnimatedTextures('kp_run', 6);
    this.kp.anchor.set(0.5, 0.5);
    this.kp.scale.set(2);
    this.kp.x = state.kp.x;
    this.kp.y = state.kp.y;
    this.kp.play();

    this.stage = new PIXI.Container();
    this.stage.addChild(this.kp);
    renderer.render(this.stage);
  }

  render(state, renderer) {
    this.kp.x += state.kp.vx;
    this.kp.y += state.kp.vy;
    if (state.kp.ani !== this.kp.currentAni) {
      this.kp.currentAni = state.kp.ani;
      this.kp.textures = this.kp.anis[this.kp.currentAni];
      this.kp.play();
    }
    this.kp.scale.x = state.kp.side === 'LEFT' ? -2 : 2;

    renderer.render(this.stage);
  }
}

function getAnimatedTextures(ref, frames) {
  let textures = [];
  for(let i = 0; i < frames; i ++) {
      textures.push(PIXI.Texture.fromFrame(`${ref}${i}.png`))
    }

  return textures;
}

export default Render;
