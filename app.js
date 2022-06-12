
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
    const shipLength = fleet[name];
    const fullPosition = [];

    if(Array.isArray(position) && inRange(position[0]) && inRange(position[1]) ) {
      if(orientation === 'vertical') {
        for (let i = 0; i < shipLength; i++) {
          fullPosition.push([position[0], (position[1]+ i)]);
        }
      }
      if(orientation === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          fullPosition.push([(position[0]+ i), position[1]]);
        }
      }
    } else {
      return false;
    }
    // This next part should only run if we confirm that the fullPosition array only contains vaild board spaces.
    // Cant be out of bounds, or already be taken by another ship!
    if(fullPosition.length > 0) {
      const ship = Ship(name, shipLength, fullPosition);
      fullPosition.forEach((index) => {
        board[index[0]][index[1]] = ship;
      });
    } else {
      return false;
    }
  }

  function receiveAttack(attackCoordinates) {
    // attack coordinates have to be valid
    let target = board[attackCoordinates[0]][attackCoordinates[1]];
    if ( target !== null) {
      board[attackCoordinates[0]][attackCoordinates[1]].isHit(attackCoordinates);
      return true;
    } else {
        missedShots.push(attackCoordinates);
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