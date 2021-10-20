let levels = [];
levels[0] = {
  map: [
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  ],
  player: {
    x: 0,
    y: 4
  },
  exit: {
    x: 4,
    y: 1
  },
  theme: 'Easy',
  levelDimension: 48,
  playerHealth: 100,
  goldValues: [10, 20, 30, 40, 50]
};

function mazeGame(id, level) {
  this.element = document.getElementById(id);
  this.tileTypes = ['floor', 'wall'];
  this.tileDimension = level.levelDimension;
  this.map = level.map;
  this.theme = level.theme;
  this.player = { ...level.player };
  this.exit = { ...level.exit };
  this.playerHealth = level.playerHealth;
  this.goldValues = level.goldValues;
}

mazeGame.prototype.populateMap = function () {
  this.element.className = 'maze-game-container ' + this.theme;
  let tiles = document.getElementById('tiles');
  for (var y = 0; y < this.map.length; ++y) {
    for (var x = 0; x < this.map[y].length; ++x) {
      let tileCode = this.map[y][x];
      let tileType = this.tileTypes[tileCode];
      let tile = this.createSprite(x, y, tileType);
      tiles.appendChild(tile);
    }
  }
}

mazeGame.prototype.createSprite = function (x, y, type) {
  let element = document.createElement('div');
  element.className = type;
  element.style.width = element.style.height = this.tileDimension + 'px';
  element.style.left = x * this.tileDimension + 'px';
  element.style.top = y * this.tileDimension + 'px';
  return element;
}

mazeGame.prototype.sizeUp = function () {
  let map = this.element.querySelector('.maze-map');
  map.style.height = this.map.length * this.tileDimension + 'px';
  map.style.width = this.map[0].length * this.tileDimension + 'px';
};

mazeGame.prototype.placeSprite = function (type) {
  let x = this[type].x
  let y = this[type].y
  let sprite = this.createSprite(x, y, type);
  sprite.id = type;
  sprite.style.borderRadius = this.tileDimension + 'px';
  let layer = this.element.querySelector('#sprites');
  layer.appendChild(sprite);
  return sprite;
}

mazeGame.prototype.generateGold = function () {
  // let addGold = document.getElementsByClassName('floor');

  // addGold.className += '-gold';

  // if (addGold = 'floor-gold') {
  //   console.log('Gold')
  // } else {
  //   console.log('No Gold')
  // }



}


mazeGame.prototype.keyboardListener = function () {
  document.addEventListener('keydown', event => {
    this.movePlayer(event);
    this.checkGoal();
  });
}

mazeGame.prototype.movePlayerArrows = function (event) {
  event.preventDefault();
  if (event.keyCode < 37 || event.keyCode > 40) {
    return;
  }
  switch (event.keyCode) {
    case 37:
      this.moveLeft();
      break;
    case 38:
      this.moveUp();
      break;
    case 39:
      this.moveRight();
      break;
    case 40:
      this.moveDown();
      break;
  }
}

mazeGame.prototype.movePlayerWASD = function (event) {
  event.preventDefault();
  if (event.keyCode < 65 || event.keyCode > 87) {
    return;
  }
  switch (event.keyCode) {
    case 65:
      this.moveLeft();
      break;
    case 87:
      this.moveUp();
      break;
    case 68:
      this.moveRight();
      break;
    case 83:
      this.moveDown();
      break;
  }
}

mazeGame.prototype.moveLeft = function (sprite) {
  if (this.player.x == 0) {
    this.collide();
    return;
  }
  let nextTile = this.map[this.player.y][this.player.x - 1];
  if (nextTile == 1) {
    this.collide();
    return;
  }
  this.player.x -= 1;
  this.updateHoriz(sprite);
}

mazeGame.prototype.moveUp = function () {
  if (this.player.y == 0) {
    this.collide();
    return;
  }
  let nextTile = this.map[this.player.y - 1][this.player.x];
  if (nextTile == 1) {
    this.collide();
    return;
  }
  this.player.y -= 1;
  this.updateVert();
}

mazeGame.prototype.moveRight = function (sprite) {
  if (this.player.x == this.map[this.player.y].length - 1) {
    this.collide();
    return;
  }
  let nextTile = this.map[this.player.y][this.player.x + 1];
  if (nextTile == 1) {
    this.collide();
    return;
  }
  this.player.x += 1;
  this.updateHoriz(sprite);
}

mazeGame.prototype.moveDown = function () {
  if (this.player.y == this.map.length - 1) {
    this.collide();
    return;
  }
  let nextTile = this.map[this.player.y + 1][this.player.x];
  if (nextTile == 1) {
    this.collide();
    return;
  }
  this.player.y += 1;
  this.updateVert();
}

mazeGame.prototype.updateVert = function () {
  this.player.element.style.top = this.player.y * this.tileDimension + 'px';
};

mazeGame.prototype.updateHoriz = function (sprite) {
  this.player.element.style.left = this.player.x * this.tileDimension + 'px';
};

mazeGame.prototype.checkGoal = function () {
  let mapAndControls = document.getElementById('maze-map-and-controls');
  if (this.player.y == this.exit.y &&
    this.player.x == this.exit.x) {
    mapAndControls.className = 'success';
  }
  else {
    mapAndControls.className = '';
  }
}

mazeGame.prototype.keyboardListener = function () {
  document.addEventListener('keydown', event => {
    this.movePlayerArrows(event);
    this.movePlayerWASD(event);
    this.checkGoal();
  });
}

mazeGame.prototype.buttonListeners = function (instrux_msg, goal_msg) {
  let up = document.getElementById('up');
  let left = document.getElementById('left');
  let down = document.getElementById('down')
  let right = document.getElementById('right');
  let obj = this;
  up.addEventListener('mousedown', function () {
    obj.moveUp();
    obj.checkGoal(instrux_msg, goal_msg);
  });
  down.addEventListener('mousedown', function () {
    obj.moveDown();
    obj.checkGoal(instrux_msg, goal_msg);
  });
  left.addEventListener('mousedown', function () {
    obj.moveLeft();
    obj.checkGoal(instrux_msg, goal_msg);
  });
  right.addEventListener('mousedown', function () {
    obj.moveRight();
    obj.checkGoal(instrux_msg, goal_msg);
  });
}

mazeGame.prototype.collide = function () {
  this.player.element.className += ' collide';
  let obj = this;
  window.setTimeout(function () {
    obj.player.element.className = 'player';
  }, 200);
  return 0;
};

function init() {
  let myGame = new mazeGame('maze-game-container-1', levels[0]);
  myGame.populateMap();
  myGame.sizeUp();
  // myGame.placeSprite('maze-gold')
  myGame.placeSprite('exit');
  let playerSprite = myGame.placeSprite('player');
  myGame.player.element = playerSprite;
  myGame.keyboardListener();
  myGame.buttonListeners();
  myGame.generateGold();
}
init();

