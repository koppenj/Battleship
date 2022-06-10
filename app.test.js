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
    const battleship = shipFactory('battleship', 2, [5,6,7]);
    expect(battleship.coordinates).toEqual([5,6,7]);
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
    console.log(battleship)
  expect(gameBoard.board).toContain('battleship');
  });

  it('can place multiple ships onto board', () => {
    const patrolBoat = shipFactory('patrolBoat', 2, [[0,4],[0,5]]);
    const submarine = shipFactory('submarine', 3, [[1,55],[1,56],[1,57]]);
    gameBoard.placeShip(patrolBoat);
    gameBoard.placeShip(submarine);
    const list = ['submarine', 'patrolBoat', 'battleship'];
    const thisBoard = gameBoard.board;

    expect(list.some(list => thisBoard.includes(list))).toBe(true)
  })
});

describe('receiveAttack', () => {
  it('tracks missed shots', () => {
    const patrolBoat = shipFactory('patrolBoat', 2, [[0,4],[0,5]]);
    gameBoard.placeShip(patrolBoat);
    gameBoard.receiveAttack([0][5]);
    const expected = [[0][5]];
    expect(gameBoard.missedShots).toEqual(expect.arrayContaining(expected));
  });

  it('does not match if received does not contain expected elements', () => {
    gameBoard.receiveAttack([0,5]);
    const expected = [[11,7]];
    expect(gameBoard.missedShots).not.toEqual(expect.arrayContaining(expected));
  });

  it('hits an occupied coordinate', () => {
    // these next tests should make sure ship object takes on a hit in its properties. NOT WRITTEN EITHER FILE
    const newPatrolBoat = shipFactory('newPatrolBoat', 2, [[0,1],[0,2]]);
    gameBoard.placeShip(newPatrolBoat);
    gameBoard.receiveAttack([0,1]);
    const expected = [[0,1]];
    expect(newPatrolBoat.hits).toContain(expect.arrayContaining(expected));
  });
  /*   test('receiveAttack places hit on proper ship', () => {
    const patrolBoat = gameBoard.placeShip('patrolBoat', 2, [[0,0], [0,1]]);
    gameBoard.receiveAttack([0,5])
  }) */
});

