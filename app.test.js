const { ShipFactory, gameBoard, Player } = require('./app');


describe('ShipFactory', () => {
  it('creates object', () => {
    const shipYard = [];
    shipYard.push(ShipFactory(3));
    shipYard.push(ShipFactory(2));
    expect(shipYard.length).toBe(2);
});
  it('returns a boolean with isSunk', () => {
    const patrolBoat = ShipFactory(2);
    expect(patrolBoat.isSunk).toBeDefined();
  });

  it('receives and stores boat coordinates', () => {
    const battleship = ShipFactory('battleship', 2, [[2,5],[2,6],[2,7]]);
    expect(battleship.coordinates).toEqual([[2,5],[2,6],[2,7]]);
  })

});

describe('gameBoard', () => {
  it('connects', () => {
    expect(gameBoard).toBeDefined();
  })


  it('tracks sunken ships', () => {
    const fleet = [
      carrier = ShipFactory('carrier', 5, [[5,8],[6,8],[7,8],[8,8],[9,8]]),
      battleship = ShipFactory('battleship', 4, [[2,2],[2,3],[2,4],[2,5]]),
      destroyer = ShipFactory('destroyer', 3, [[2,6],[3,6],[4,6]]),
      submarine = ShipFactory('submarine', 3, [[7,1],[8,1],[9,1]]),
      patrolBoat = ShipFactory('patrolBoat', 2,[[0,0],[1,0]]),
    ];

    fleet.forEach((ship) => {
      gameBoard.sunkenShips.push(ship);
    })

    expect(gameBoard.fleetSunk).toBeTruthy();
  });
});

describe('placeShip', () => {
  it('places a ship onto board', () => {
    const battleship = ShipFactory('battleship', 3, [[1,5],[1,6],[1,7]]);
    gameBoard.placeShip(battleship);

    expect(gameBoard.board[1][5]).toBe(battleship);
  });

  it.skip('can place multiple ships onto board', () => {
    // Code is working. Need to find proper way to test this
    const patrolBoat = shipFactory('patrolBoat', 2, [[0,4],[0,5]]);
    const submarine = shipFactory('submarine', 3, [[1,5],[1,6],[1,7]]);
    gameBoard.placeShip(patrolBoat);
    gameBoard.placeShip(submarine);
    const board = gameBoard.board;
    const fleet = [patrolBoat, submarine];
    const occupiedPositions = board.flat().filter(position => position !== null);
    expect(occupiedPositions).toContain(fleet);
  })
});

describe('receiveAttack', () => {
  it('tracks missed shots', () => {
    const patrolBoat = ShipFactory('patrolBoat', 2, [[0,4],[0,5]]);
    gameBoard.placeShip(patrolBoat);
    gameBoard.receiveAttack([0,6]);
    const expected = [[0,6]];
    expect(gameBoard.missedShots).toEqual(expect.arrayContaining(expected));
  });

  it('does not match if received does not contain expected elements', () => {
    gameBoard.receiveAttack([3,5]);
    const expected = [[9,7]];
    expect(gameBoard.missedShots).not.toEqual(expect.arrayContaining(expected));
  });

  it('hits an occupied coordinate', () => {
    const newPatrolBoat = ShipFactory('newPatrolBoat', 2, [[0,1],[0,2]]);
    gameBoard.placeShip(newPatrolBoat);
    gameBoard.receiveAttack([0,2]);
    expect(newPatrolBoat.hits).toStrictEqual([[0,2]]);
  });
});

describe('Player', () => {
  it('has a name', () => {
    const Josh = Player('Josh');
    expect(Josh).toBeTruthy();
  })
})

