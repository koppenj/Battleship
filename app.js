
const ShipFactory = function (name, length, coordinates) {
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
  return {isSunk, isHit, hits, name, coordinates}
}

const gameBoard = (() => {
  // board should be styled in css. See tictactoe css for reference
  const board = [];
    // fleet is just for future reference for ship size
  const fleet = { carrier:5, battleship:4, destroyer:3, submarine:3, patrolBoat:2 }
  const missedShots = [];
  const sunkenShips = [];

  (function drawGrid () {
    for (let i = 0; i < 10; i++) {
      board[i] = new Array(10).fill(null);
    }
  })();

  function placeShip(ship, orientation) {
    if(orientation === 'vertical') {
      // If all the selected squares are valid (exist and not taken), place it with y coordinate staying the same
    }
    if(orientation === 'horizontal') {
      // If all the selected squares are valid (exist and not taken), place it with x coordinate staying the same
    }
    // This places them based on the stored value in the ship object
    for (let i = 0; i < ship.coordinates.length; i++) {
      for (let j = 0; j < ship.coordinates.length; j++) {
        if(ship.coordinates[i] !== undefined) {
          const position = ship.coordinates[i]
          board[position[0]][position[1]] = ship;
        }
      }
    }
  }

  function receiveAttack(attackCoordinates) {
    /* const occupiedPositions = board.flat().filter(position => position !== null) */ // This reduces the board down
    let target = board[attackCoordinates[0]][attackCoordinates[1]];
    if ( target !== null) {
      target.isHit(attackCoordinates);
    } else {
      return missedShots.push(attackCoordinates);
    }
  }

  function fleetSunk() {
    if (sunkenShips.length === 5) {
      return true;
    } else {
      return false;
    }
  }
  return { board, placeShip, receiveAttack, fleetSunk, missedShots, sunkenShips}
})();

const Player = function (name) {
  this.name = name;

  attack = (position) => {
    return gameBoard.receiveAttack(position);
  }
  randomPlay = () => {
    let x = Math.floor(Math.random() * (10));
    let y = Math.floor(Math.random() * (10));
    const shuffled = [x,y];
    return shuffled;
  }

  return { name, attack, randomPlay }
}

module.exports.Player = Player;
module.exports.gameBoard = gameBoard;
module.exports.ShipFactory = ShipFactory;