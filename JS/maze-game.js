// import {levels} from './Levels/easy-level'

// mazeGame.prototype.runMenu = function(event) { // needs work
//   if (event.keyCode != 13) {
//     return
//   } else if (event.keycode = 13) {
//     this.gamestate == 1;
//     var elem = document.getElementById('menu');
//     return elem.parentNode.removeChild(elem);
//     init();
//   }
// }

let levels = [];
levels[0] = {
  map: [
    [1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  ],
  player: {
    x: 0,
    y: 10,
    hasKey: false,
    playerHealth: 100,
    currentGold: 0
  },
  exit: {
    x: 7,
    y: 4
  },
  theme: 'Easy',
  levelDimension: 48,
  playerHealth: 100,
  goldValues: [10, 20, 30, 40, 50],
  treasureValue: [100],
  treasure: {
    x: 9,
    y: 10
  },
  key: {
    x: 3,
    y: 0
  },
  goblin1: {
    x: 7,
    y: 6
  },
  goblin2: {
    x: 3,
    y: 1
  },
  goblin3: {
    x: 9,
    y: 9
  },
  orc1: {
    x:2,
    y:5
  },
  orc2: {
    x: 8,
    y: 2
  }
};

function mazeGame(id, level) {
  this.element = document.getElementById(id);
  this.tileTypes = ['floor maze-gold', 'wall'];
  this.tileDimension = level.levelDimension;
  this.map = level.map;
  this.theme = level.theme;
  this.player = { ...level.player };
  this.exit = { ...level.exit };
  this.playerHealth = level.playerHealth;
  this.goldValues = level.goldValues;
  this.treasure = { ...level.treasure };
  this.key = { ...level.key }
  this.currentGold = level.currentGold;
  this.goblin1 = {...level.goblin1};
  this.goblin2 = {...level.goblin2};
  this.goblin3 = {...level.goblin3};
  this.orc1 = {...level.orc1};
  this.orc2 = {...level.orc2};
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

// mazeGame.prototype.createGold = function () { //Needs Work
//   // element.className = 
// }

// mazeGame.prototype.addeGold = function () {
// let mazeGold = document.getElementById('tiles');
// for (var y = 0; y < this.map.length; ++y) {
//   for (var x = 0; x < this.map[y].length; ++x) {
//     let goldCode = this.map[y][x];
//     let goldType = this.tileTypes[goldCode];
//     if (goldType === 1) {
//       mazeGold.className += ' maze-gold'
//     }
//     else {
//       mazeGold.className += ''
//     }
//   }
// let addGold = document.getElementsByClassName('floor');

// addGold.className += '-gold';

// if (addGold = 'floor-gold') {
//   console.log('Gold')
// } else {
//   console.log('No Gold')
// }
// }

// let mazeGold = document.getElementById("maze-gold");
// for (var y = 0; y < this.map.length; ++y) {
//   for (var x = 0; x < this.map[y].length; ++x) {
//     let tileCode = this.map[y][x];
//     let tileType = this.tileTypes[tileCode];
//     let gold = this.createSprite(x, y, tileType);
//     if (tileType = 'floor') {
//       mazeGold.className += "maze-gold"
//     } else {
//       mazeGold.classList += ''
//     }


//   }

mazeGame.prototype.collectGold = function () { //Needs work
  let player = document.getElementById('player');
  let goldPlacement = document.getElementsByClassName('floor maze-game');
  // let goldAmount = this.goldValues;
  let randomGold = this.goldValues[Math.floor(Math.random() * this.goldValues.length)];
  if (this.player.y == goldPlacement.y &&
    this.player.x == goldPlacement.x) {
    goldPlacement.className += ' test';
    this.player.goldAmount += randomGold
    console.log(this.player.goldAmount)
  } else {
    console.log('No Gold')
  }
  console.log(this.player.goldAmount)
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

mazeGame.prototype.checkKey = function () { // Needs Work
  let player = document.getElementById('player');
  let playerGetsKey = this.player.hasKey;
  // let keyPlacement = document.getElementById('key');
  let keyPlacement = this.key
  let key = document.getElementById('key')
  if (this.player.y == keyPlacement.y &&
    this.player.x == keyPlacement.x) {
    alert("you picked up the key");
    playerGetsKey = true;
    key.parentNode.removeChild(key);
    keyPlacement.y = -10;
    keyPlacement.x = -10;
    console.log(this.player.hasKey)
  }
  else {
    player.className += ''
  }
  // }
  // if (player.hasKey === 1) {
  //   console.log('player has key')
  // } else if (player.hasKey === 0) {
  //   console.log('player does not have key')
  // } else {
  //   console.log('somethings not working')
  // }
}

mazeGame.prototype.checkTreasure = function () { //Needs Work
  let player = document.getElementById('player');
  let doesPlayerHaveKey = this.player.hasKey;
  let treasurePlacement = this.treasure;
  let treaure = document.getElementById('treasure');
  if (this.player.y == treasurePlacement.y &&
    this.player.x == treasurePlacement.x &&
    doesPlayerHaveKey == true) {
    alert('Treasure chest opened')
  } else if (this.player.y == treasurePlacement.y &&
    this.player.x == treasurePlacement.x &&
    doesPlayerHaveKey == false) {
    alert('Key needed!')
  } else if (this.player.y == treasurePlacement.y &&
    this.player.x == treasurePlacement.x &&
    doesPlayerHaveKey == undefined || doesPlayerHaveKey == null) {
    alert('Somethings not working')
  }
}

mazeGame.prototype.keyboardListener = function () {
  document.addEventListener('keydown', event => {
    this.movePlayerArrows(event);
    this.movePlayerWASD(event);
    this.checkGoal();
    this.checkKey();
    this.checkTreasure();
    this.collectGold();
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
    obj.checkKey()
  });
  down.addEventListener('mousedown', function () {
    obj.moveDown();
    obj.checkGoal(instrux_msg, goal_msg);
    obj.checkKey()
  });
  left.addEventListener('mousedown', function () {
    obj.moveLeft();
    obj.checkGoal(instrux_msg, goal_msg);
    obj.checkKey()
  });
  right.addEventListener('mousedown', function () {
    obj.moveRight();
    obj.checkGoal(instrux_msg, goal_msg);
    obj.checkKey()
  });
}

mazeGame.prototype.collide = function () { //needs work
  this.player.element.className += ' collide';
  let obj = this;
  window.setTimeout(function () {
    obj.player.element.className = 'player';
  }, 200);
  return 0;

  // this.player.element.className += ' collide'
  // let obj = this;
  // window.setTimeout(function () {
  //   if (obj.player.element.contains('hasKey')) {
  //     obj.placeSprite.element.className = 'player hasKey';
  //   } else if (obj.player.element.className == 'player') {
  //     obj.player.element.className = 'player';
  //   }
  // }, 200)
  // return 0;

};

function init() {
  let myGame = new mazeGame('maze-game-container-1', levels[0]);
  myGame.populateMap();
  myGame.sizeUp();
  myGame.placeSprite('exit');
  myGame.placeSprite('treasure');
  myGame.placeSprite('key');
  myGame.placeSprite('goblin1');
  myGame.placeSprite('goblin2');
  myGame.placeSprite('goblin3');
  myGame.placeSprite('orc1');
  myGame.placeSprite('orc2');
  let playerSprite = myGame.placeSprite('player');
  myGame.player.element = playerSprite;
  myGame.keyboardListener();
  myGame.buttonListeners();
  myGame.collectGold();
  // console.log(myGame.player.hasKey)
  // console.log(myGame.player.playerHealth)
  // console.log(myGame.player.goldAmount)
}

// mazeGame.prototype.runMenu = function () { //Needs Work
//   var elem = document.getElementById('menu');
//   return elem.parentNode.removeChild(elem);
//   init();
// }

  init();

  // function menu(){
  //   runMenu();
  // };

