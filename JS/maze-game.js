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
  theme: 'easy',
  levelDim: 64,
};

function Game(id, level) {
  this.el = document.getElementById(id);
  this.tileTypes = ['floor', 'wall'];
  this.tileDim = level.levelDim;
  this.map = level.map;
  this.theme = level.theme;
  this.player = { ...level.player };
  this.goal = { ...level.goal };
}

Game.prototype.populateMap = function () {
  this.el.className = 'maze-game-container ' + this.theme;
  let tiles = document.getElementById('tiles');
  for (var y = 0; y < this.map.length; ++y) {

    for (var x = 0; x < this.map[y].length; ++x) {

      let tileCode = this.map[y][x];
      let tileType = this.tileTypes[tileCode];
      let tile = this.createEl(x,y,tileType);
      
       tiles.appendChild(tile);
    }
  }
}

Game.prototype.createEl = function (x, y, type) {

  let el = document.createElement('div');

  el.className = type;
  el.style.width = el.style.height = this.tileDim + 'px';
  el.style.left = x * this.tileDim + 'px';

  el.style.top = y * this.tileDim + 'px';

  return el;
}

Game.prototype.sizeUp = function() {
  
  let map  = this.el.querySelector('.maze-map');
  map.style.height = this.map.length * this.tileDim + 'px'; 
  map.style.width = this.map[0].length * this.tileDim + 'px';
};

function init() {
  let myGame = new Game('maze-game-container-1',levels[0]);
    
   myGame.populateMap();
   myGame.sizeUp();
}
init();

