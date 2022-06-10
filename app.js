
const shipFactory = function (name, length, coordinates) {
  this.name = name;
  this.length = length;
  this.coordinates = coordinates;
  let hits = [];

  isHit = (enemyAttack) => {
    if (coordinates.includes(enemyAttack)) {
      hits.push('X');
    } else {
      return false;
    }
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
    for (let i = 0; i < 100; i++) {
      board[i] = ' ';
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
      return true;
      /* shipLocations[coordinates].hits = [attackCoordinates]; */
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