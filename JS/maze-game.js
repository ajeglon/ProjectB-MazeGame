let levels = [];
levels['0'] = {
  map: [
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  ],
  player: {
    x: 0,
    y: 4
  },
  exit: {
    x: 9,
    y: 10
  },
  theme: 'Easy',
  levelDimension: 48,
};

function mazeGame(id, level) {
  this.element = document.getElementById(id);
  this.tileTypes = ['floor', 'wall'];
  this.tileDimension = level.levelDimension;
  this.map = level.map;
  this.theme = level.theme;
  this.player = { ...level.player };
  this.exit = { ...level.exit };
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

mazeGame.prototype.keyboardListener = function () {
  document.addEventListener('keydown', event => {
    this.movePlayer(event);
  });
}

mazeGame.prototype.movePlayer = function (event) {

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
mazeGame.prototype.keyboardListener = function() {
  document.addEventListener('keydown', event => {
    this.movePlayer(event);
  });
}

mazeGame.prototype.moveLeft = function(sprite) {

  this.player.x -= 1;

  this.updateHoriz(sprite);
}
mazeGame.prototype.moveUp = function() {

  this.player.y -= 1;

  this.updateVert();
}
mazeGame.prototype.moveRight = function(sprite) {

  this.player.x += 1;

  this.updateHoriz(sprite);
}
mazeGame.prototype.moveDown = function() {

  this.player.y += 1;

  this.updateVert();
}

mazeGame.prototype.updateVert = function() {
  this.player.element.style.top = this.player.y * this.tileDimension + 'px';
};

mazeGame.prototype.updateHoriz = function(sprite) {
  this.player.element.style.left = this.player.x * this.tileDimension + 'px';
};


function init() {
  let myGame = new mazeGame('maze-game-container-1', levels[0]);

  myGame.populateMap();
  myGame.sizeUp();

  myGame.placeSprite('exit');
  let playerSprite = myGame.placeSprite('player');
  myGame.player.element = playerSprite;

  myGame.keyboardListener();
}
init();

