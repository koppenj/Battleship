import './app';
import './UI';
import { game } from './app'
const startGame = document.querySelector('#newGame');
startGame.addEventListener('click', game());

