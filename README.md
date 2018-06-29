# Snake
_Typical snake game with different renders and controls._

It was an attempt to build simple game with separation of concerns. 
I tried to decouple game logic, render and control.
Current version of the game can be rendered using React.js, HTML5 Canvas or console. 
It also has browser and console controls. 

You can play with React.js version here: https://cdn.rawgit.com/Telichkin/snake/react-render/index.html
and with HTML5 Canvas version here: https://cdn.rawgit.com/Telichkin/snake/canvas-render/index.html
Use WASD buttons for navigation. 
The current version doesn't have any UI, so you need to refresh the page when the game is over.

You can also play in your console in three steps:
```
$ git clone https://github.com/Telichkin/snake.git && cd snake
$ npm run build
$ npm start
```

If you want to compose your own version of snake, you need to clone this repository 
and change settings of the Game instance:
```javascript
// src/main.js
import Game from './game';
import Control from './control/console';
// or import Control from './control/browser';

import Render from './render/console';
// or import Render from './render/react';
// or import Render from './render/canvas';

Game({ 
  size: 20, 
  speed: 10, 
  controlFactory: Control, 
  renderFactory: Render 
}).start();
```

## TODO
1. Add UI
2. Add walls
3. Add level builder
