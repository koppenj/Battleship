import './app';
import './UI';
import { game } from './app';
import { wipeBoards } from './UI';

const startGame = document.querySelector('#newGame');
startGame.addEventListener('click', () => {
  wipeBoards();
  game();
});

