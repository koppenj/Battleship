
const shipFactory = function (name, length, coordinates) {
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
  return {isSunk, hits, name, coordinates}
}

const gameBoard = (() => {
  // board should be styled in css. See tictactoe css for reference
  const board = [];
  (function drawGrid () {
    for (let i = 0; i < 10; i++) {
      board[i] = new Array(10).fill(null);
    }
  })();

  const missedShots = [];
  const sunkenShips = [];

  function placeShip(ship) {
    for (let i = 0; i < ship.coordinates.length; i++) {
      for (let j = 0; j < ship.coordinates.length; j++) {
        if(ship.coordinates[i] !== undefined) {
          const position = ship.coordinates[i]
          board[position[0]][position[1]] = ship.name;
        }
      }
    }
  }

  function receiveAttack(attackCoordinates) {
    const occupiedPositions = board.flat().filter(position => position !== null) // This reduces the board down
    // Rework this function. Im not looking in the right place with the right data structure

    if (occupiedPositions.includes(attackCoordinates)) {
      const target = board[attackCoordinates[0]][attackCoordinates[1]];
      return target.isHit(attackCoordinates);
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
  return { board, placeShip, receiveAttack, fleetSunk, missedShots}
})();

module.exports.gameBoard = gameBoard;
module.exports.shipFactory = shipFactory;