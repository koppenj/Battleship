import { game } from './app';

function drawBoards () {
  const playerGrid = document.querySelector('#playerGrid');
  const enemyGrid = document.querySelector('#enemyGrid');

  const user = { board:game.userBoard.board, container:playerGrid };
  const enemy = { board:game.computerBoard.board, container:enemyGrid };
  const players = [user, enemy];

  players.forEach((player) => {
    for(let i = 0; i < player.board.length; i++) {
      for (let i = 1; i <= player.board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('gridCell');
        cell.textContent = 'x';
        player.container.style.gridTemplateColumns = `repeat(10, 1fr)`;
        player.container.style.gridTemplateRows = `repeat(10, 1fr)`;
        player.container.appendChild(cell);
      }
    }
  })
};

function autoPlaceShips() {
    game.userBoard.placeShip('carrier', [4,4], 'vertical');
    game.userBoard.placeShip('battleship', [0,0], 'horizontal');
    game.userBoard.placeShip('destroyer', [6,6], 'horizontal');
    game.userBoard.placeShip('submarine', [5,0], 'vertical');
    game.userBoard.placeShip('patrolBoat', [5,5], 'horizontal');

    game.computerBoard.placeShip('carrier', [4,4], 'vertical');
    game.computerBoard.placeShip('battleship', [0,0], 'horizontal');
    game.computerBoard.placeShip('destroyer', [6,6], 'horizontal');
    game.computerBoard.placeShip('submarine', [5,0], 'vertical');
    game.computerBoard.placeShip('patrolBoat', [5,5], 'horizontal');
}

function turnControl() {
  console.log(game.playerTurn)
  const whoIsFiring = game.playerTurn;
  if (whoIsFiring === game.user) {
    console.log(game.user);
  }

  if(whoIsFiring === game.computer) {
    let attack = game.computer.randomPlay();
    console.log(attack)
    let result =  game.userBoard.receiveAttack(attack);
    if (result) {
      console.log( 'HIT')
      game.playerTurn = game.computer;
      console.log(game.playerTurn)
    } else {
      console.log('MISS')
      game.playerTurn = game.user;
      console.log(game.playerTurn)
    }
  }

}
export { drawBoards, autoPlaceShips, turnControl }