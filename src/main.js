import Game from './game';
import Control from './control/browser';
import Render from './render/canvas';

Game({ 
  size: 20,
  speed: 10, 
  controlFactory: Control, 
  renderFactory: Render 
}).start();