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
    x: 4,
    y: 4
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
  this.goal = { ...level.goal };
}

mazeGame.prototype.populateMap = function () {
  this.element.className = 'maze-game-container ' + this.theme;
  let tiles = document.getElementById('tiles');
  for (var y = 0; y < this.map.length; ++y) {
    for (var x = 0; x < this.map[y].length; ++x) {
      let tileCode = this.map[y][x];
      let tileType = this.tileTypes[tileCode];
      let tile = this.createEl(x, y, tileType);
      tiles.appendChild(tile);
    }
  }
}

mazeGame.prototype.createEl = function (x, y, type) {
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

function init() {
  let myGame = new mazeGame('maze-game-container-1', levels[0]);

  myGame.populateMap();
  myGame.sizeUp();
}
init();

