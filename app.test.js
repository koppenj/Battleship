const { Ship, Gameboard, Player } = require('./app');


describe('Ship', () => {
  // Length, hits, if its sunk
  it('creates object', () => {
    const shipYard = [];
    shipYard.push(Ship(3));
    shipYard.push(Ship(2));
    expect(shipYard.length).toBe(2);
});
  it('stores ship length as a property', () => {
    const lengthTest = Ship('lengthTest', 4);
    expect(lengthTest.length).toBe(4);
  })
  it('returns a boolean with isSunk', () => {
    const patrolBoat = Ship(2);
    expect(patrolBoat.isSunk).toBeDefined();
  });

  it('receives and stores boat coordinates', () => {
    const battleship = Ship('battleship', 2, [[2,5],[2,6],[2,7]]);
    expect(battleship.coordinates).toEqual([[2,5],[2,6],[2,7]]);
  })

});

describe('Gameboard', () => {
  it('connects', () => {
    expect(Gameboard).toBeDefined();
  })


  it('tracks sunken ships', () => {
    const testBoard = Gameboard('new');
    const fleet = [
      carrier = Ship('carrier', 5, [[5,8],[6,8],[7,8],[8,8],[9,8]]),
      battleship = Ship('battleship', 4, [[2,2],[2,3],[2,4],[2,5]]),
      destroyer = Ship('destroyer', 3, [[2,6],[3,6],[4,6]]),
      submarine = Ship('submarine', 3, [[7,1],[8,1],[9,1]]),
      patrolBoat = Ship('patrolBoat', 2,[[0,0],[1,0]]),
    ];

    fleet.forEach((ship) => {
     testBoard.sunkenShips.push(ship);
    })

    expect(testBoard.fleetSunk).toBeTruthy();
  });
});

describe('placeShip', () => {
  it('places a ship onto board', () => {
    const testBoard = Gameboard('testBoard');
    testBoard.placeShip('battleship', [1,5], 'vertical');
    expect(testBoard.board[1][8].name).toBe('battleship');
  });

  it('can place multiple ships onto board', () => {
    const testBoard = Gameboard('testBoard');
    testBoard.placeShip('battleship', [1,5], 'vertical');
    testBoard.placeShip('submarine', [4,6], 'horizontal' );
    const testFleet = [testBoard.board[1][7].name,testBoard.board[5][6].name];

    expect(testFleet[0]).toBe('battleship');
    expect(testFleet[1]).toBe('submarine');
  })
});

describe('receiveAttack', () => {
  it('tracks missed shots', () => {
    const testBoard = Gameboard('testBoard');
    testBoard.placeShip('battleship', [1,5], 'vertical');
    testBoard.receiveAttack([0,0]);
    const expected = [[0,0]];
    expect(testBoard.missedShots).toEqual(expect.arrayContaining(expected));
  });

  it('hits an occupied coordinate', () => {
    const testBoard = Gameboard('testBoard');
    testBoard.placeShip('battleship', [1,5], 'vertical');
    testBoard.receiveAttack([1,6]);
    expect(testBoard.board[1][6].hits).toStrictEqual([undefined]);
  });
});

describe('Player', () => {
  it('has a name', () => {
    const Josh = Player('Josh');
    expect(Josh).toBeTruthy();
  });
  it('can make a random array for attack', () => {
    const James = Player('James');
    const array = James.randomPlay();
    expect(Array.isArray(array)).toBeTruthy();
  })
  it.skip('can send attack to Gameboard', () => {
    const James = Player('James');
    const target = James.attack([6,5]);
    Gameboard.receiveAttack([6,5])
    expect(target).toHaveBeenCalled();
  })
})

