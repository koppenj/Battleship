
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
      board[i] = new Array(10).fill(' ');
    }
  })();

  const missedShots = [];
  const sunkenShips = [];

  function placeShip(ship) {
   for (let i = 0; i < ship.coordinates.length; i++) {
     const location = ship.coordinates[i];
     location.forEach(position => {
       board[position] = ship.name;
     });
   }
  }

  function receiveAttack(attackCoordinates) {
    if (board.find(coordinates => coordinates === attackCoordinates)) {
      const target = board[attackCoordinates].value;
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