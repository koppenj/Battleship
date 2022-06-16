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
export { drawBoards }