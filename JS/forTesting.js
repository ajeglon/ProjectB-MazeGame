function woof(str) {
  if (typeof str !== "string") {
    return;
  }
  return str.length + 'woof!';
}

module.exports = woof;

let levels = [];
levels[0] = {
  map: [
    [1, 1, 1, 2, 1, 2, 2, 2, 1, 2],
    [1, 2, 2, 2, 0, 0, 1, 2, 1, 2],
    [1, 2, 1, 1, 0, 0, 1, 2, 2, 2],
    [0, 0, 1, 1, 1, 2, 1, 1, 1, 2],
    [0, 0, 2, 1, 2, 2, 1, 2, 1, 2],
    [1, 1, 2, 2, 2, 1, 1, 2, 1, 2],
    [2, 2, 2, 1, 0, 0, 1, 2, 2, 2],
    [2, 1, 2, 1, 0, 0, 2, 2, 1, 1],
    [2, 1, 2, 2, 2, 2, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 2, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 1, 2],
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
  // hasKey: false,
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
    y: 6,
    damage: 15
  },
  goblin2: {
    x: 4,
    y: 1,
    damage: 15
  },
  goblin3: {
    x: 9,
    y: 9,
    damage: 20
  },
  orc1: {
    x: 3,
    y: 5,
    damage: 30
  },
  orc2: {
    x: 8,
    y: 2,
    damage: 40
  },
  gold1: {
    x: 2,
    y: 4
  },
  gold2: {
    x: 4,
    y: 4
  },
  gold3: {
    x: 0,
    y: 7
  },
  gold4: {
    x: 7,
    y: 0
  },
  gold5: {
    x: 9,
    y: 6
  }
};

function mazeGame(id, level) {
  this.element = document.getElementById(id);
  this.tileTypes = ['floor maze-gold', 'wall', 'corridor'];
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
  this.goblin1 = { ...level.goblin1 };
  this.goblin2 = { ...level.goblin2 };
  this.goblin3 = { ...level.goblin3 };
  this.orc1 = { ...level.orc1 };
  this.orc2 = { ...level.orc2 };
  this.gold1 = { ...level.gold1 };
  this.gold2 = { ...level.gold2 };
  this.gold3 = { ...level.gold3 };
  this.gold4 = { ...level.gold4 };
  this.gold5 = { ...level.gold5 };
  this.hasKey = false;
  this.gold1Value = level.gold1.value
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

mazeGame.prototype.healthAndGoldButtons = function () {
  var buttonCreator = document.getElementById('health-and-gold');
  var playerGold = this.player.currentGold;
  var playerHealth = this.playerHealth;
  buttonCreator.innerHTML = '<button id="gold-counter"> Gold: ' + playerGold + '</button>' + '<button id="health-counter"> Health: ' + playerHealth + '</button>'
}

mazeGame.prototype.checkKey = function () {
  var player = document.getElementById('player');
  var keyPlacement = this.key;
  var key = document.getElementById('key');
  var playerGetsKey = this.player.hasKey;
  if (playerGetsKey === false) {
    if (this.player.y == keyPlacement.y &&
      this.player.x == keyPlacement.x) {
      alert("you picked up the key");
      key.parentNode.removeChild(key);
      keyPlacement.y = -10;
      keyPlacement.x = -10;
      this.player.hasKey = true;
    }
  }
};

mazeGame.prototype.checkGold = function () {
  let player = document.getElementById('player');
  let gold1Value = 20;
  let gold2Value = 20;
  let gold3Value = 30;
  let gold4Value = 40;
  let gold5Value = 50;
  let gold1Placement = this.gold1;
  let gold2Placement = this.gold2;
  let gold3Placement = this.gold3;
  let gold4Placement = this.gold4;
  let gold5Placement = this.gold5;
  var playerGold = this.player.currentGold;
  let gold1 = document.getElementById('gold1');
  let gold2 = document.getElementById('gold2');
  let gold3 = document.getElementById('gold3');
  let gold4 = document.getElementById('gold4');
  let gold5 = document.getElementById('gold5');
  console.log(playerGold)
  if (this.player.y == gold1Placement.y &&
    this.player.x == gold1Placement.x) {
    gold1.parentNode.removeChild(gold1);
    gold1Placement.y = -10;
    gold1Placement.x = -10;
    playerGold += gold1Value;
    console.log(playerGold)
    console.log(this.playerGold)
    console.log(this.player.playerGold)
    this.updateGold();
    return
  }
  if (this.player.y == gold2Placement.y &&
    this.player.x == gold2Placement.x) {
    gold2.parentNode.removeChild(gold2);
    gold2Placement.y = -10;
    gold2Placement.x = -10;
  }
  if (this.player.y == gold3Placement.y &&
    this.player.x == gold3Placement.x) {
    gold3.parentNode.removeChild(gold3);
    gold3Placement.y = -10;
    gold3Placement.x = -10;
  }
  if (this.player.y == gold4Placement.y &&
    this.player.x == gold4Placement.x) {
    gold4.parentNode.removeChild(gold4);
    gold4Placement.y = -10;
    gold4Placement.x = -10;
  }
  if (this.player.y == gold5Placement.y &&
    this.player.x == gold5Placement.x) {
    gold5.parentNode.removeChild(gold5);
    gold5Placement.y = -10;
    gold5Placement.x = -10;
  }
}

mazeGame.prototype.updateGold = function () {
  var playerGold = this.currentGold;
  var goldCounter= document.getElementById('gold-counter');
  goldCounter.innerHTML = 'Gold: ' + toString.playerGold;

}

mazeGame.prototype.checkTreasure = function () { //Needs Work
  let player = document.getElementById('player');
  let doesPlayerHaveKey = this.player.hasKey;
  let treasurePlacement = this.treasure;
  let treaure = document.getElementById('treasure');
  let playerGold = this.player.currentGold;
  if (this.player.y == treasurePlacement.y &&
    this.player.x == treasurePlacement.x &&
    doesPlayerHaveKey == true) {
    alert('Treasure chest opened')
    treaure.parentNode.removeChild(treaure);
    treasurePlacement.y = -10;
    treasurePlacement.x = -10;
    playerGold += 100;
    // healthAndGoldButtons();
    console.log(this.player.currentGold)
    console.log(playerGold)
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
    this.checkGold();
    // this.collectGold();
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
};

// mazeGame.prototype.runMenu = function () { //Needs Work
//   var elem = document.getElementById('menu');
//   return elem.parentNode.removeChild(elem);
//   init();
// }

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
  myGame.placeSprite('gold1');
  myGame.placeSprite('gold2');
  myGame.placeSprite('gold3');
  myGame.placeSprite('gold4');
  myGame.placeSprite('gold5');
  let playerSprite = myGame.placeSprite('player');
  myGame.player.element = playerSprite;
  myGame.keyboardListener();
  myGame.buttonListeners();
  myGame.healthAndGoldButtons();
  // myGame.collectGold();
  // myGame.createGold();
  // console.log(myGame.player.playerHealth)
  console.log(myGame.player.currentGold)
}



init();

  // function menu(){
  //   runMenu();
  // };


