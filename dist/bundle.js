(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controller;

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Controller(logic) {
  _readline2.default.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  var self = {
    start: function start() {
      onPress('w', logic.moveUp);
      onPress('s', logic.moveDown);
      onPress('d', logic.moveRight);
      onPress('a', logic.moveLeft);
    }
  };

  function onPress(keyName, action) {
    process.stdin.on('keypress', function (_, key) {
      return key.name === keyName && action();
    });
  }

  return self;
}
}).call(this,require('_process'))
},{"_process":20,"readline":19}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Game;

var _gameLogic = require('./logic/gameLogic');

var _gameLogic2 = _interopRequireDefault(_gameLogic);

var _gameLoop = require('./gameLoop');

var _gameLoop2 = _interopRequireDefault(_gameLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Game(_ref) {
  var size = _ref.size,
      speed = _ref.speed,
      controlFactory = _ref.controlFactory,
      renderFactory = _ref.renderFactory;

  var logic = (0, _gameLogic2.default)(size),
      control = controlFactory(logic),
      render = renderFactory(logic, size),
      gameLoop = (0, _gameLoop2.default)(logic, render, Math.floor(1000 / speed));

  var self = {
    start: function start() {
      gameLoop.start();control.start();
    }
  };
  return self;
}
},{"./gameLoop":3,"./logic/gameLogic":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GameLoop;
function GameLoop(logic, render, tickMs) {
  var interval = void 0;

  var self = {
    start: function start() {
      interval = setInterval(loop, tickMs);
    },
    stop: function stop() {
      clearInterval(interval);
    }
  };

  function loop() {
    logic.tick();render.update();logic.gameIsOver() && self.stop();
  }

  return self;
}
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CyclePos;

var _position = require('./position');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CyclePos(x, y, maxSize) {
  var self = {
    increaseX: function increaseX() {
      return CyclePos(cycle(x + 1), y, maxSize);
    },
    decreaseX: function decreaseX() {
      return CyclePos(cycle(x - 1), y, maxSize);
    },
    increaseY: function increaseY() {
      return CyclePos(x, cycle(y + 1), maxSize);
    },
    decreaseY: function decreaseY() {
      return CyclePos(x, cycle(y - 1), maxSize);
    }
  };

  function cycle(n) {
    var s = maxSize + 1;return (s + n % s) % s;
  }

  return Object.assign({}, (0, _position2.default)(x, y), self);
}
},{"./position":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Direction;
function Direction(dir) {
  switch (dir) {
    case 'up':
      return Up();
    case 'down':
      return Down();
    case 'right':
      return Right();
    case 'left':
      return Left();
    default:
      return Null();
  }
}

function Up() {
  var self = {
    move: function move(startPos) {
      return startPos.increaseY();
    },
    isOppositeTo: function isOppositeTo(otherDirection) {
      return otherDirection.equals(Down());
    }
  };
  return Object.assign({}, Base('up'), self);
}

function Down() {
  var self = {
    move: function move(startPos) {
      return startPos.decreaseY();
    },
    isOppositeTo: function isOppositeTo(otherDirection) {
      return otherDirection.equals(Up());
    }
  };
  return Object.assign({}, Base('down'), self);
}

function Right() {
  var self = {
    move: function move(startPos) {
      return startPos.increaseX();
    },
    isOppositeTo: function isOppositeTo(otherDirection) {
      return otherDirection.equals(Left());
    }
  };
  return Object.assign({}, Base('right'), self);
}

function Left() {
  var self = {
    move: function move(startPos) {
      return startPos.decreaseX();
    },
    isOppositeTo: function isOppositeTo(otherDirection) {
      return otherDirection.equals(Right());
    }
  };
  return Object.assign({}, Base('left'), self);
}

function Null() {
  var self = {
    move: function move(startPos) {
      return startPos;
    },
    isOppositeTo: function isOppositeTo() {
      return false;
    }
  };
  return Object.assign({}, Base(''), self);
}

function Base(dir) {
  var self = {
    equals: function equals(otherDirection) {
      return self.hash() === otherDirection.hash();
    },
    hash: function hash() {
      return dir;
    }
  };
  return self;
}
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Field;

var _cyclePosition = require('./cyclePosition');

var _cyclePosition2 = _interopRequireDefault(_cyclePosition);

var _list = require('../primitives/list');

var _list2 = _interopRequireDefault(_list);

var _loop = require('../primitives/loop');

var _loop2 = _interopRequireDefault(_loop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Field(size) {
  var snake = void 0;
  var positions = (0, _list2.default)(),
      _center = Math.floor(size / 2);
  (0, _loop2.default)(size).times(function (x) {
    return (0, _loop2.default)(size).times(function (y) {
      return positions.append(pos(x, y));
    });
  });

  var self = {
    center: function center() {
      return pos(_center, _center);
    },
    putSnake: function putSnake(someSname) {
      snake = someSname;
    },
    freePositions: function freePositions() {
      return snake ? positions.without(snake.positions()) : positions;
    }
  };

  function pos(x, y) {
    return (0, _cyclePosition2.default)(x, y, size - 1);
  }

  return self;
}
},{"../primitives/list":12,"../primitives/loop":13,"./cyclePosition":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GameLogic;

var _snake = require('./snake');

var _snake2 = _interopRequireDefault(_snake);

var _direction = require('./direction');

var _direction2 = _interopRequireDefault(_direction);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

var _list = require('../primitives/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GameLogic(fieldSize) {
  var snakeFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _snake2.default;

  var field = (0, _field2.default)(fieldSize),
      snake = snakeFactory(field.center());
  field.putSnake(snake);
  var apple = field.freePositions().random(),
      direction = (0, _direction2.default)('');

  var self = {
    tick: function tick() {
      if (self.gameIsOver()) {
        return;
      };
      snake.move(direction);
      snake.headPosition().equals(apple) && grow();
    },
    moveUp: function moveUp() {
      direction = (0, _direction2.default)('up');
    },
    moveDown: function moveDown() {
      direction = (0, _direction2.default)('down');
    },
    moveRight: function moveRight() {
      direction = (0, _direction2.default)('right');
    },
    moveLeft: function moveLeft() {
      direction = (0, _direction2.default)('left');
    },
    freePositions: function freePositions() {
      return field.freePositions();
    },
    snakePositions: function snakePositions() {
      return snake.positions();
    },
    applePositions: function applePositions() {
      return (0, _list2.default)(apple);
    },
    gameIsOver: function gameIsOver() {
      return snake.isEatItself();
    }
  };

  function grow() {
    snake.grow();apple = field.freePositions().random();
  }

  return self;
}
},{"../primitives/list":12,"./direction":5,"./field":6,"./snake":9}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Pos(_x, _y) {
  var self = {
    x: function x() {
      return _x;
    },
    y: function y() {
      return _y;
    },
    increaseX: function increaseX() {
      return Pos(_x + 1, _y);
    },
    decreaseX: function decreaseX() {
      return Pos(_x - 1, _y);
    },
    increaseY: function increaseY() {
      return Pos(_x, _y + 1);
    },
    decreaseY: function decreaseY() {
      return Pos(_x, _y - 1);
    },
    equals: function equals(otherPos) {
      return otherPos.hash() === self.hash();
    },
    hash: function hash() {
      return _x + " " + _y;
    }
  };
  return self;
}
exports.default = Pos;
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Snake;

var _fixedList = require('../primitives/fixedList');

var _fixedList2 = _interopRequireDefault(_fixedList);

var _direction = require('./direction');

var _direction2 = _interopRequireDefault(_direction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Snake(headPos) {
  var growPos = void 0,
      _positions = (0, _fixedList2.default)(headPos),
      headDir = (0, _direction2.default)();

  var self = {
    move: function move(direction) {
      headDir = direction.isOppositeTo(headDir) ? headDir : direction;
      headPos = headDir.move(_positions.first());
      growPos = _positions.last();
      _positions.insert(headPos);
    },
    headPosition: function headPosition() {
      return headPos;
    },
    positions: function positions() {
      return _positions;
    },
    grow: function grow() {
      _positions.increaseSize();_positions.append(growPos);
    },
    isEatItself: function isEatItself() {
      return _positions.hasDuplicates();
    }
  };
  return self;
}
},{"../primitives/fixedList":11,"./direction":5}],10:[function(require,module,exports){
'use strict';

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _console = require('./control/console');

var _console2 = _interopRequireDefault(_console);

var _console3 = require('./render/console');

var _console4 = _interopRequireDefault(_console3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _game2.default)({
  size: 20,
  speed: 10,
  controlFactory: _console2.default,
  renderFactory: _console4.default
}).start();
},{"./control/console":1,"./game":2,"./render/console":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FixedList;

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FixedList() {
  var list = _list2.default.apply(undefined, arguments);var size = list.size();

  var self = {
    insert: function insert(item) {
      list.insert(item);list.deleteLast(list.size() > size);
    },
    append: function append(item) {
      list.append(item);list.deleteFirst(list.size() > size);
    },
    increaseSize: function increaseSize() {
      size += 1;
    }
  };
  return Object.assign({}, list, self);
}
},{"./list":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = List;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function List() {
  var hashes = [].concat(Array.prototype.slice.call(arguments)).map(hash),
      arr = [].concat(Array.prototype.slice.call(arguments));

  var self = {
    first: function first() {
      return self.get(0);
    },
    last: function last() {
      return self.get(-1);
    },
    get: function get(i) {
      return arr[index(i)];
    },
    set: function set(i, item) {
      arr[index(i)] = item;hashes[index(i)] = hash(item);
    },
    size: function size() {
      return arr.length;
    },
    insert: function insert(item) {
      arr.unshift(item);hashes.unshift(hash(item));
    },
    appendUnique: function appendUnique(item) {
      !self.has(item) && self.append(item);
    },
    append: function append(item) {
      arr.push(item);hashes.push(hash(item));
    },
    deleteLast: function deleteLast(n) {
      _deleteLast(arr, n);_deleteLast(hashes, n);
    },
    deleteFirst: function deleteFirst(n) {
      arr.splice(0, n);hashes.splice(0, n);
    },
    random: function random() {
      return self.get(Math.floor(Math.random() * self.size()));
    },
    reversed: function reversed() {
      return List.apply(undefined, _toConsumableArray([].concat(_toConsumableArray(arr)).reverse()));
    },
    without: function without(list) {
      return self.filter(function (item) {
        return !list.has(item);
      });
    },
    union: function union(list) {
      return self.and(list).unique();
    },
    and: function and(list) {
      return List.apply(undefined, _toConsumableArray(arr).concat(_toConsumableArray(list.asArray())));
    },
    has: function has(item) {
      return hashes.includes(hash(item));
    },
    asArray: function asArray() {
      return [].concat(_toConsumableArray(arr));
    },
    unique: function unique() {
      var res = List();self.forEach(res.appendUnique);return res;
    },
    forEach: function forEach(fn) {
      arr.forEach(fn);
    },
    filter: function filter(fn) {
      return List.apply(undefined, _toConsumableArray(arr.filter(fn)));
    },
    map: function map(fn) {
      return List.apply(undefined, _toConsumableArray(arr.map(fn)));
    },
    equals: function equals(other) {
      return other.size() === self.size() && arr.every(function (o, i) {
        return hash(o) === hash(other.get(i));
      });
    },
    hasDuplicates: function hasDuplicates() {
      return self.size() > self.unique().size();
    }
  };

  function _deleteLast(array, n) {
    array.splice(array.length - n, array.length);
  }
  function hash(o) {
    return o.hash ? o.hash() : o;
  }
  function index(i) {
    return i < 0 ? self.size() + i : i;
  }

  return self;
}
},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loop;
function Loop(number) {
  var self = {
    times: function times(fn) {
      for (var i = 0; i < number; i++) {
        fn(i);
      }
    }
  };
  return self;
}
},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseCell;
function BaseCell(free, snake, apple) {
  var state = free;

  var self = {
    toFree: function toFree() {
      state = free;
    },
    toSnake: function toSnake() {
      state = snake;
    },
    toApple: function toApple() {
      state = apple;
    },
    render: function render() {
      return state;
    }
  };
  return self;
}
},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseField;

var _loop = require('../../primitives/loop');

var _loop2 = _interopRequireDefault(_loop);

var _list = require('../../primitives/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BaseField(size, Row) {
  var field = (0, _list2.default)();(0, _loop2.default)(size).times(function (y) {
    return field.insert(Row(size, y));
  });

  var self = {
    get: function get(p) {
      return field.get(p.y()).get(p.x());
    },
    render: function render() {
      throw Error('Should be implemented');
    },
    renderRows: function renderRows() {
      return field.reversed().map(function (row) {
        return row.render();
      });
    }
  };
  return self;
}
},{"../../primitives/list":12,"../../primitives/loop":13}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseRender;
function BaseRender(logic, field) {
  var self = {
    update: function update() {
      logic.freePositions().forEach(function (p) {
        return field.get(p).toFree();
      });
      logic.snakePositions().forEach(function (p) {
        return field.get(p).toSnake();
      });
      logic.applePositions().forEach(function (p) {
        return field.get(p).toApple();
      });
      field.render();
    }
  };
  return self;
}
},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseRow;

var _loop = require('../../primitives/loop');

var _loop2 = _interopRequireDefault(_loop);

var _list = require('../../primitives/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BaseRow(size, y, Cell) {
  var row = (0, _list2.default)();(0, _loop2.default)(size).times(function (x) {
    return row.append(Cell(x, y));
  });

  var self = {
    get: function get(x) {
      return row.get(x);
    },
    render: function render() {
      throw Error('Should be implemented');
    },
    renderCells: function renderCells() {
      return row.map(function (cell) {
        return cell.render();
      });
    }
  };
  return self;
}
},{"../../primitives/list":12,"../../primitives/loop":13}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Render;

var _cell = require('./base/cell');

var _cell2 = _interopRequireDefault(_cell);

var _row = require('./base/row');

var _row2 = _interopRequireDefault(_row);

var _field = require('./base/field');

var _field2 = _interopRequireDefault(_field);

var _render = require('./base/render');

var _render2 = _interopRequireDefault(_render);

var _loop = require('../primitives/loop');

var _loop2 = _interopRequireDefault(_loop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Render(logic, size) {
  return (0, _render2.default)(logic, Field(size));
}

function Field(size) {
  var border = '-';(0, _loop2.default)(size).times(function (_) {
    return border += '--';
  });

  var self = Object.assign({}, (0, _field2.default)(size, Row), {
    render: function render() {
      console.clear();
      console.log(border);
      self.renderRows().forEach(function (r) {
        return console.log(r);
      });
      console.log(border);
    }
  });
  return self;
}

function Row(size, y) {
  var self = Object.assign({}, (0, _row2.default)(size, y, Cell), {
    render: function render() {
      return '|' + self.renderCells().asArray().join(' ') + '|';
    }
  });
  return self;
}

function Cell() {
  return (0, _cell2.default)(' ', '+', 'A');
}
},{"../primitives/loop":13,"./base/cell":14,"./base/field":15,"./base/render":16,"./base/row":17}],19:[function(require,module,exports){

},{}],20:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[10]);
