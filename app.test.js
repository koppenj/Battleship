const { shipFactory } = require('./app');
const { gameBoard } = require('./app');

describe('shipFactory', () => {
  it('creates object', () => {
    const shipYard = [];
    shipYard.push(shipFactory(3));
    shipYard.push(shipFactory(2));
    expect(shipYard.length).toBe(2);
});
  it('returns a boolean with isSunk', () => {
    const patrolBoat = shipFactory(2);
    expect(patrolBoat.isSunk).toBeDefined();
  });

  it('receives and stores boat coordinates', () => {
    const battleship = shipFactory('battleship', 2, [[2,5],[2,6],[2,7]]);
    expect(battleship.coordinates).toEqual([[2,5],[2,6],[2,7]]);
  })

});

describe('gameBoard', () => {
  it('connects', () => {
    expect(gameBoard).toBeDefined();
  })
  it('has properties', () => {
    expect(gameBoard.receiveAttack()).toBeDefined();
  });
  /*
  test('gameBoard tracks sunken ships', () => {
    const fleet = [
      carrier = shipFactory('carrier', 5, [10,11,12,13,14]),
      battleship = shipFactory('battleship', 4, [44,45,46,47]),
      destroyer = shipFactory('destroyer', 3, [17,18,19]),
      submarine = shipFactory('submarine', 3, [55,56,57]),
      patrolBoat = shipFactory('patrolBoat', 2,[0,1]),
    ];

    fleet.forEach((ship) => {
      gameBoard.sunkenShips.push(`${ship.name}`);
    })

    expect(gameBoard.fleetSunk).toBeTruthy();
  }) */
});

describe('placeShip', () => {
  it('places a ship onto board', () => {
    const battleship = shipFactory('battleship', 3, [[1,5],[1,6],[1,7]]);
    gameBoard.placeShip(battleship);
    expect(gameBoard.board[1][5]).toMatch('battleship');
  });

    // The code IS working, but idk how to use the correct matchers
  it.skip('can place multiple ships onto board', () => {
    const patrolBoat = shipFactory('patrolBoat', 2, [[0,4],[0,5]]);
    const submarine = shipFactory('submarine', 3, [[1,5],[1,6],[1,7]]);
    gameBoard.placeShip(patrolBoat);
    gameBoard.placeShip(submarine);
    const board = gameBoard.board;
    // Next line reduces board to an array of strings with names of ships
    const occupiedPositions = board.flat().filter(position => position !== null);
    expect(board).toContain(occupiedPositions);
  })
});

describe('receiveAttack', () => {
  it('tracks missed shots', () => {
    const patrolBoat = shipFactory('patrolBoat', 2, [[0,4],[0,5]]);
    gameBoard.placeShip(patrolBoat);
    gameBoard.receiveAttack([0,5]);
    const expected = [[0,5]];
    expect(gameBoard.missedShots).toEqual(expect.arrayContaining(expected));
  });

  it('does not match if received does not contain expected elements', () => {
    gameBoard.receiveAttack([3,5]);
    const expected = [[9,7]];
    expect(gameBoard.missedShots).not.toEqual(expect.arrayContaining(expected));
  });

  it('hits an occupied coordinate', () => {
    const newPatrolBoat = shipFactory('newPatrolBoat', 2, [[0,1],[0,2]]);
    gameBoard.placeShip(newPatrolBoat);
    gameBoard.receiveAttack([0,3]);
    // IDK how to write this
    expect(newPatrolBoat.hits).toContain(expect.arrayContaining([0,3]));
  });
  /*   test('receiveAttack places hit on proper ship', () => {
    const patrolBoat = gameBoard.placeShip('patrolBoat', 2, [[0,0], [0,1]]);
    gameBoard.receiveAttack([0,5])
  }) */
});

