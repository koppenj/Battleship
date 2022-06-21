export function drawBoards (userBoard, computerBoard) {
  const playerGrid = document.querySelector('#playerGrid');
  const enemyGrid = document.querySelector('#enemyGrid');

  const userObj = { board:userBoard.board, container:playerGrid };
  const computerObj = { board:computerBoard.board, container:enemyGrid };
  const players = [userObj, computerObj];

  players.forEach((player) => {
    for(let i = 0; i < player.board.length; i++) {
      for (let j = 0; j <= 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('gridCell');
        cell.textContent = ' ';
        cell.id = player.board[i][j];
        player.container.style.gridTemplateColumns = `repeat(10, 1fr)`;
        player.container.style.gridTemplateRows = `repeat(10, 1fr)`;
        player.container.appendChild(cell);
      }
    }
  })
};

export function autoPlaceShips(userBoard, computerBoard) {
    userBoard.placeShip('carrier', [4,4], 'vertical');
    userBoard.placeShip('battleship', [0,0], 'horizontal');
    userBoard.placeShip('destroyer', [6,6], 'horizontal');
    userBoard.placeShip('submarine', [5,0], 'vertical');
    userBoard.placeShip('patrolBoat', [5,5], 'horizontal');

    computerBoard.placeShip('carrier', [4,4], 'vertical');
    computerBoard.placeShip('battleship', [0,0], 'horizontal');
    computerBoard.placeShip('destroyer', [6,6], 'horizontal');
    computerBoard.placeShip('submarine', [5,0], 'vertical');
    computerBoard.placeShip('patrolBoat', [5,5], 'horizontal');
}

export function messageControl (message) {
  const notification = document.getElementById('messages');
  return notification.textContent = message;
}

export function markBoard(targetBoard, attackCoordinates) {
  console.log(attackCoordinates)
  console.log(targetBoard[attackCoordinates[0]][attackCoordinates[1]]);
  targetBoard[attackCoordinates[0]][attackCoordinates[1]].textContent = 'BB';

}