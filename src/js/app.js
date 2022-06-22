import * as UI from './UI';

class Ship {
  constructor(name, length, coordinates) {
    this.name = name;
    this.length = length;
    this.coordinates = coordinates;
    this.hits = [];
  }
    isHit(enemyAttack) {
      this.hits.push(enemyAttack);
    }

    isSunk() {
      if (hits.length >= length) {
        return true;
      } else {
        return false;
      }
    }
}

const Gameboard = function () {
  const board = [];
  const missedShots = [];
  const sunkenShips = [];
  // fleet is used to reference ship lengths
  const fleet = { carrier:5, battleship:4, destroyer:3, submarine:3, patrolBoat:2 };

  (function drawGrid () {
    for (let i = 0; i <= 9; i++) {
      board[i] = new Array(10).fill(null);
    }
  })();

  function placeShip( name, position, orientation) {
    const shipLength = fleet[name];
    const fullPosition = [];
    if(Array.isArray(position) && inRange(position[0]) && inRange(position[1]) ) {
      if(orientation === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          if(board[position[0]][position[1]] === null) {
            fullPosition.push([position[0], (position[1]+ i)]);
          }
        }
      }

      if(orientation === 'vertical') {
        for (let i = 0; i < shipLength; i++) {
          if(board[position[0]][position[1]] === null) {
            fullPosition.push([(position[0]+ i), position[1]]);
          }
        }
      }
    } else {
      console.error('Wrong coordinate format');
      return false;
    }
    /*  Last Check! The fullPosition array will only be vaild if every requested space for a new ship is available
      This whole function would be a good candidate to implement Throw Error, no?  */
    if(fullPosition.length === shipLength ) {
      const ship = new Ship(name, shipLength, fullPosition);
      fullPosition.forEach((index) => {
        board[index[0]][index[1]] = ship;
      });
    } else {
      console.error('Collision issue With' + ` ${name}` + '. Check placement.');
      return false;
    }
    return true;
  }

  function receiveAttack(attackCoordinates) {
    if(inRange(attackCoordinates[0]) && inRange(attackCoordinates[1])) {
      let target = this.board[attackCoordinates[0]][attackCoordinates[1]];
      if ( target !== null) {
        board[attackCoordinates[0]][attackCoordinates[1]].isHit(attackCoordinates);
        UI.markBoard(attackCoordinates);
        return true;
      } else {
          missedShots.push(attackCoordinates);
          return false;
      }
    } else {
      return false;
    }
  }

  function fleetSunk() {
    if (sunkenShips.length === 5) {
      return true;
    } else {
      return false;
    }
  }
  function inRange(x) {
    // I help determine if coordinate inputs are valid
    return ((x)*(x-9) <= 0);
  }

  return { board, placeShip, receiveAttack, fleetSunk, missedShots, sunkenShips}
}

class Player {
  constructor(name) {
    this.name = name;
    this.attackList = [];
  }
    randomPlay() {
      let x = Math.floor(Math.random() * (10));
      let y = Math.floor(Math.random() * (10));
      const shuffled = [x, y];

      if (this.attackList.includes(shuffled)) {
        return randomPlay();
      } else {
        this.attackList.push(shuffled);
        return shuffled;
      }
    }
  }

function game() {
  const user = new Player('user');
  const userBoard = new Gameboard('userBoard');
  const computer = new Player('computer');
  const computerBoard = new Gameboard('computerBoard');
  let playerTurn = computer;

  UI.drawBoards(userBoard, computerBoard);
  UI.autoPlaceShips(userBoard, computerBoard);
  UI.messageControl(playerTurn.name + `'s turn!`);

  if (playerTurn === user) {
    computerBoard.receiveAttack();
    playerTurn = computer;
  }
  if (playerTurn === computer) {
    const attack = computer.randomPlay();
    userBoard.receiveAttack(attack);
    playerTurn = user;
  }
};

export { game };

/* module.exports.Player = Player;
module.exports.Gameboard = Gameboard;
module.exports.Ship = Ship; */
