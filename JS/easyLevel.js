
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
    currentGold: 0,
    playerAttack: 0,
    playerDefence: 0
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
  },
  goblin2: {
    x: 4,
    y: 1,
  },
  goblin3: {
    x: 9,
    y: 9,
  },
  orc1: {
    x: 3,
    y: 5,
  },
  orc2: {
    x: 8,
    y: 2,
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

export { levels }