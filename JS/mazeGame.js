import { levels } from './levels.js'
function mazeGame(id, level) {
  this.element = document.getElementById(id);
  this.tileTypes = ['floor maze-gold', 'wall', 'corridor'];
  // Inherit the level's properties
  this.tileDimension = level.levelDimension;
  this.map = level.map;
  this.theme = level.theme;
  // Make a copy of the level's player.
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
  this.gold1Value = level.gold1.value;
  this.gold2Value = level.gold2.value;
  this.gold3Value = level.gold3.value;
  this.gold4Value = level.gold4.value;
  this.gold5Value = level.gold5.value;
  this.playerAttack = level.playerAttack;
  this.playerDefence = level.playerDefence;
  this.level_idx = 0;
  this.healthPotion = { ...level.healthPotion };
};

 // Applies the level theme as a class to the game element. 
 // Populates the map by adding tiles and sprites to their respective layers. 
mazeGame.prototype.populateMap = function () {
  this.element.className = 'maze-game-container ' + this.theme;
  let tiles = document.getElementById('tiles');
  // Loop to populate the grid.
  for (var y = 0; y < this.map.length; ++y) {
    for (var x = 0; x < this.map[y].length; ++x) {
      let tileCode = this.map[y][x];
      let tileType = this.tileTypes[tileCode];
      let tile = this.createSprite(x, y, tileType);
      // Add the tile layer
      tiles.appendChild(tile);
    }
  }
};

// Create a tile or sprite <div> element.
mazeGame.prototype.createSprite = function (x, y, type) {
  let element = document.createElement('div');
  element.className = type;
  // Set width and height of tile
  element.style.width = element.style.height = this.tileDimension + 'px';
  // Set left positions
  element.style.left = x * this.tileDimension + 'px';
  // Set top position
  element.style.top = y * this.tileDimension + 'px';
  return element;
};

// Sizes up the map based on array dimensions.
mazeGame.prototype.sizeUp = function () {
  // Inner container so that text can be below it
  let map = this.element.querySelector('.maze-map');
  // Inner container, height. Need this.map
  map.style.height = this.map.length * this.tileDimension + 'px';
  map.style.width = this.map[0].length * this.tileDimension + 'px';
};

// Places sprite based on their x and y coordinates
mazeGame.prototype.placeSprite = function (type) {
  let x = this[type].x;
  let y = this[type].y;
  let sprite = this.createSprite(x, y, type);
  sprite.id = type;
  // Set the border radius of the sprite
  sprite.style.borderRadius = this.tileDimension + 'px';
  // Grab the layer
  let layer = this.element.querySelector('#sprites');
  layer.appendChild(sprite);
  return sprite;
};

// uses arrow key keycodes, if one between 37 and 40 are entered, the relevent function is called
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

// same as above but for WASD keys
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

// Movement helpers
//Moves the player sprite left
mazeGame.prototype.moveLeft = function (sprite) {
  // if at the boundary, return
  if (this.player.x == 0) {
    this.collide();
    return;
  }
  // itentify next tile
  let nextTile = this.map[this.player.y][this.player.x - 1];
  // if next tile is a wall, add collide effect and return
  if (nextTile == 1) {
    this.collide();
    return;
  }
  // change coordinates of player object
  this.player.x -= 1;
  // update location of DOM element
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

//Updates vertical position of player sprite based on object's y coordinates.
mazeGame.prototype.updateVert = function () {
  this.player.element.style.top = this.player.y * this.tileDimension + 'px';
};

// same as above but for horizontal
mazeGame.prototype.updateHoriz = function (sprite) {
  this.player.element.style.left = this.player.x * this.tileDimension + 'px';
};

// Check on whether goal has been reached.
mazeGame.prototype.checkGoal = function () {
  let mapAndControls = document.getElementById('maze-map-and-controls');
  if (this.player.y == this.exit.y &&
    this.player.x == this.exit.x &&
    this.player.currentGold == 270) {
    mapAndControls.className = 'success';
  }
  else if (this.player.y == this.exit.y &&
    this.player.x == this.exit.x) {
    alert('Retrieve all the gold to pass')
  }
  else {
    mapAndControls.className = '';
  }
}

//creates buttons to displat attack and defence stats
mazeGame.prototype.attackAndDefenceButtons = function () {
  var buttonCreator = document.getElementById('attack-and-defend');
  var playerAttack = this.player.playerAttack;
  var playerDefence = this.player.playerDefence;
  buttonCreator.innerHTML = '<button id="player-attack"> Attack: ' + playerAttack + '</button>' + '<button id="player-defence"> Defence: ' + playerDefence + '</button>'
}

//creates buttons to displat health and gold stats
mazeGame.prototype.healthAndGoldButtons = function () {
  var buttonCreator = document.getElementById('health-and-gold');
  var playerGold = this.player.currentGold;
  var playerHealth = this.playerHealth;
  buttonCreator.innerHTML = '<button id="gold-counter"> Gold: ' + playerGold + '</button>' + '<button id="health-counter"> Health: ' + playerHealth + '</button>';
}

// checks if player has the key and to give them the key once finding it
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

// checks if current tile is an enemy, if so player loses health based on enemy damage value
mazeGame.prototype.checkEnemy = function () {
  let player = document.getElementById('player');
  let goblin1Placement = this.goblin1;
  let goblin1Damage = 15;
  let goblin2Placement = this.goblin2;
  let goblin2Damage = 15;
  let goblin3Placement = this.goblin3;
  let goblin3Damage = 20;
  let orc1Placement = this.orc1;
  let orc1Damage = 50;
  let orc2Placement = this.orc2;
  let orc2Damage = 40;
  let playerHealth = this.player.playerHealth;
  if (this.player.y == goblin1Placement.y &&
    this.player.x == goblin1Placement.x) {
    goblin1.parentNode.removeChild(goblin1);
    goblin1Placement.y = -10;
    goblin1Placement.x = -10;
    this.player.playerHealth = this.player.playerHealth - goblin1Damage;
  }
  if
    (this.player.y == goblin2Placement.y &&
    this.player.x == goblin2Placement.x) {
    goblin2.parentNode.removeChild(goblin2);
    goblin2Placement.y = -10;
    goblin2Placement.x = -10;
    this.player.playerHealth = this.player.playerHealth - goblin2Damage;
  }
  if (this.player.y == goblin3Placement.y &&
    this.player.x == goblin3Placement.x) {
    goblin3.parentNode.removeChild(goblin3);
    goblin3Placement.y = -10;
    goblin3Placement.x = -10;
    this.player.playerHealth = this.player.playerHealth - goblin3Damage;
  }
  if (this.player.y == orc1Placement.y &&
    this.player.x == orc1Placement.x) {
    orc1.parentNode.removeChild(orc1);
    orc1Placement.y = -10;
    orc1Placement.x = -10;
    this.player.playerHealth = this.player.playerHealth - orc1Damage;
  }
  if (this.player.y == orc2Placement.y &&
    this.player.x == orc2Placement.x) {
    orc2.parentNode.removeChild(orc2);
    orc2Placement.y = -10;
    orc2Placement.x = -10;
    this.player.playerHealth = this.player.playerHealth - orc2Damage;
  }
}

// checks if current tile is gold if so player gains score according to gold value
mazeGame.prototype.checkGold = function () {
  let player = document.getElementById('player');
  let gold1Value = 20;
  let gold2Value = 20;
  let gold3Value = 30;
  let gold4Value = 30;
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
  if (this.player.y == gold1Placement.y &&
    this.player.x == gold1Placement.x) {
    gold1.parentNode.removeChild(gold1);
    gold1Placement.y = -10;
    gold1Placement.x = -10;
    this.player.currentGold = this.player.currentGold + gold1Value;
    console.log('you picked up gold 1');
  }
  if (this.player.y == gold2Placement.y &&
    this.player.x == gold2Placement.x) {
    gold2.parentNode.removeChild(gold2);
    gold2Placement.y = -10;
    gold2Placement.x = -10;
    this.player.currentGold = this.player.currentGold + gold2Value;
    console.log('you picked up gold 2');
  }
  if (this.player.y == gold3Placement.y &&
    this.player.x == gold3Placement.x) {
    gold3.parentNode.removeChild(gold3);
    gold3Placement.y = -10;
    gold3Placement.x = -10;
    this.player.currentGold = this.player.currentGold + gold3Value;
    console.log('you picked up gold 3');
  }
  if (this.player.y == gold4Placement.y &&
    this.player.x == gold4Placement.x) {
    gold4.parentNode.removeChild(gold4);
    gold4Placement.y = -10;
    gold4Placement.x = -10;
    this.player.currentGold = this.player.currentGold + gold4Value;
    console.log('you picked up gold 4');
  }
  if (this.player.y == gold5Placement.y &&
    this.player.x == gold5Placement.x) {
    gold5.parentNode.removeChild(gold5);
    gold5Placement.y = -10;
    gold5Placement.x = -10;
    this.player.currentGold = this.player.currentGold + gold5Value;
    console.log('you picked up gold 5');
  }
}

//needs work
// mazeGame.prototype.healthPotion = function () { 
//   let healthPotionHeal = 50;
//   let healthPotionPlacement = this.healthPotion;
//   let healthPotion = document.getElementById('healthPotion');
//   if (this.player.y == healthPotionPlacement.y &&
//     this.player.x == healthPotionPlacement.x) {
//     healthPotion.parentNode.removeChild(healthPotion);
//     healthPotionPlacement.y = -10;
//     healthPotionPlacement.x = -10;
//     this.player.playerHealth = this.player.playerHealth + healthPotionHeal;
//     console.log('you picked up a Health Potion');
//   }
// }

//updates the players score and displays on gold button
mazeGame.prototype.updateGold = function () {
  var playerGold = this.currentGold;
  var goldCounter = document.getElementById('gold-counter');
  goldCounter.innerHTML = 'Gold: ' + this.player.currentGold;
}

//updates the players health and displays on health button
mazeGame.prototype.updateHealth = function () {
  var healthCounter = document.getElementById('health-counter');
  healthCounter.innerHTML = 'Health: ' + this.player.playerHealth;
  if (this.player.playerHealth <= 0) {
    alert('You have taken too much damage and perished');
    this.restart();
  }
}

//refreshes the page to restart
mazeGame.prototype.restart = function () {
  location.reload();
}

mazeGame.prototype.checkTreasure = function () {
  let player = document.getElementById('player');
  let doesPlayerHaveKey = this.player.hasKey;
  let treasurePlacement = this.treasure;
  let treaure = document.getElementById('treasure');
  let treasureValue = 120;
  let playerGold = this.player.currentGold;
  console.log(this.player.currentGold)
  console.log(playerGold)
  if (this.player.y != treasurePlacement.y &&
    this.player.x != treasurePlacement.x) {
    return
  }
  else if (this.player.y == treasurePlacement.y &&
    this.player.x == treasurePlacement.x &&
    doesPlayerHaveKey == true) {
    alert('Treasure chest opened')
    treaure.parentNode.removeChild(treaure);
    treasurePlacement.y = -10;
    treasurePlacement.x = -10;
    this.player.currentGold = this.player.currentGold + treasureValue;
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

// Responds to a keydown event by moving the player and checking the goal.
mazeGame.prototype.keyboardListener = function () {
  document.addEventListener('keydown', event => {
    this.movePlayerArrows(event);
    this.movePlayerWASD(event);
    this.checkGoal();
    this.checkKey();
    this.checkTreasure();
    this.checkGold();
    this.checkEnemy();
    this.updateGold();
    this.updateHealth();
    // this.healthPotion();
    // this.updateAttack();
    // this.updateDefence();
  });
}

//Adds mouse down listeners to button
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
    obj.checkTreasure();
    obj.checkGold();
    obj.checkEnemy();
    obj.updateGold();
    obj.updateHealth();
    // obj.healthPotion();
  });
  down.addEventListener('mousedown', function () {
    obj.moveDown();
    obj.checkGoal(instrux_msg, goal_msg);
    obj.checkKey()
    obj.checkTreasure();
    obj.checkGold();
    obj.checkEnemy();
    obj.updateGold();
    obj.updateHealth();
    // obj.healthPotion();
  });
  left.addEventListener('mousedown', function () {
    obj.moveLeft();
    obj.checkGoal(instrux_msg, goal_msg);
    obj.checkKey()
    obj.checkTreasure();
    obj.checkGold();
    obj.checkEnemy();
    obj.updateGold();
    obj.updateHealth();
    // obj.healthPotion();
  });
  right.addEventListener('mousedown', function () {
    obj.moveRight();
    obj.checkGoal(instrux_msg, goal_msg);
    obj.checkKey()
    obj.checkTreasure();
    obj.checkGold();
    obj.checkEnemy();
    obj.updateGold();
    obj.updateHealth();
    // obj.healthPotion();
  });
}

//Triggers a collide animation on the player sprite.
mazeGame.prototype.collide = function () { //needs work
  this.player.element.className += ' collide';
  let obj = this;
  window.setTimeout(function () {
    obj.player.element.className = 'player';
  }, 200);
  return 0;
};

//Needs Work
// mazeGame.prototype.runMenu = function () { 
//   var elem = document.getElementById('menu');
//   return elem.parentNode.removeChild(elem);
//   init();
// }

//If goal has been reached,
mazeGame.prototype.addMazeListener = function () {
  // grab the map
  let map = this.element.querySelector('.maze-map');
  let obj = this;
  // if game board is clicked or tapped, see it should change levels
  map.addEventListener('mousedown', function (e) {
    if (obj.player.y != obj.exit.y ||
      obj.player.x != obj.exit.x) {
      return;
    }
    obj.changeLevel();  
    let layers = obj.el.querySelectorAll('.layer');
      
       for (layer of layers) {
           layer.innerHTML = '';
       }
       obj.placeLevel();
       obj.checkGoal();
  });
}

mazeGame.prototype.changeLevel = function () { //Needs work

  this.level_idx++;

  if (this.level_idx > levels.length - 1) {
    this.level_idx = 0;
  }
  let level = levels[this.level_idx];
  this.map = level.map;

  this.theme = level.theme;
  this.player = { ...level.player };
  this.exit = { ...level.exit };
}

mazeGame.prototype.addListeners = function () {

  this.keyboardListener();

  this.buttonListeners();
  this.addMazeListener();
}

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
  myGame.placeSprite('healthPotion')
  let playerSprite = myGame.placeSprite('player');
  myGame.player.element = playerSprite;
  myGame.keyboardListener();
  myGame.buttonListeners();
  myGame.healthAndGoldButtons();
  myGame.attackAndDefenceButtons();
}



init();

  // function menu(){
  //   runMenu();
  // };


