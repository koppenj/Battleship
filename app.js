
const Ship = function (name, length, coordinates) {
  this.name = name;
  this.length = length;
  this.coordinates = coordinates;
  let hits = [];

  isHit = (enemyAttack) => {
    hits.push(enemyAttack);
  }

  isSunk = () => {
    if(hits.length >= length) {
      return true;
    } else {
      return false;
    }
  }
  return {name, length, coordinates, hits, isHit, isSunk}
}

const Gameboard = function (owner) {
  this.owner = owner;
  const board = [];
  const missedShots = [];
  const sunkenShips = [];
  // fleet is used to reference ship lengths
  const fleet = { carrier:5, battleship:4, destroyer:3, submarine:3, patrolBoat:2 };

  (function drawGrid () {
    for (let i = 0; i < 10; i++) {
      board[i] = new Array(10).fill(null);
    }
  })();

  function placeShip( name, position, orientation) {
    debugger;
    const shipLength = fleet[name];
    const fullPosition = [];
    if(Array.isArray(position) && inRange(position[0]) && inRange(position[1]) ) {
      if(orientation === 'vertical') {
        for (let i = 0; i < shipLength; i++) {
          if(board[position[0]][position[1]] === null) {
            fullPosition.push([position[0], (position[1]+ i)]);
          }
        }
      }

      if(orientation === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          if(board[position[0]][position[1]] === null) {
            fullPosition.push([(position[0]+ i), position[1]]);
          }
        }
      }
    } else {
      return false;
    }
    // Cant already be taken by another ship,
    // So If every index in fullPosition is a null value on board, then proceed
    function fullPositionTest(fullPosition) {
      fullPosition.forEach((position) => {
        if(board[position[0]][position[1]] !== null) {
          return false;
        }
     });
    }

    if(fullPosition.length > 0 && (fullPositionTest(fullPosition) !== false) ) {
      const ship = Ship(name, shipLength, fullPosition);
      fullPosition.forEach((index) => {
        board[index[0]][index[1]] = ship;
      });
    } else {
      return false;
    }
    return true;
  }

  function receiveAttack(attackCoordinates) {
    if(inRange(attackCoordinates[0]) && inRange(attackCoordinates[1])) {
      let target = board[attackCoordinates[0]][attackCoordinates[1]];
      if ( target !== null) {
        board[attackCoordinates[0]][attackCoordinates[1]].isHit(attackCoordinates);
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
};



const Player = function (name) {
  this.name = name;

  randomPlay = () => {
    let x = Math.floor(Math.random() * (10));
    let y = Math.floor(Math.random() * (10));
    const shuffled = [x,y];
    return shuffled;
  }
  return { name, randomPlay }
}

module.exports.Player = Player;
module.exports.Gameboard = Gameboard;
module.exports.Ship = Ship;