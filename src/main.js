import Game from './game';
import Control from './control/console';
import Render from './render/console';

Game({ 
  size: 20,
  speed: 10, 
  controlFactory: Control, 
  renderFactory: Render 
}).start();