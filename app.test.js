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
    const fleet = [
      carrier = Ship('carrier', 5, [[5,8],[6,8],[7,8],[8,8],[9,8]]),
      battleship = Ship('battleship', 4, [[2,2],[2,3],[2,4],[2,5]]),
      destroyer = Ship('destroyer', 3, [[2,6],[3,6],[4,6]]),
      submarine = Ship('submarine', 3, [[7,1],[8,1],[9,1]]),
      patrolBoat = Ship('patrolBoat', 2,[[0,0],[1,0]]),
    ];

    fleet.forEach((ship) => {
      Gameboard.sunkenShips.push(ship);
    })

    expect(Gameboard.fleetSunk).toBeTruthy();
  });
});

describe('placeShip', () => {
  it('places a ship onto board', () => {
    const battleship = Ship('battleship', 3, [[1,5],[1,6],[1,7]]);
    Gameboard.placeShip(battleship);

    expect(Gameboard.board[1][5]).toBe(battleship);
  });

  it.skip('can place multiple ships onto board', () => {
    // Code is working. Need to find proper way to test this
    const patrolBoat = Ship('patrolBoat', 2, [[0,4],[0,5]]);
    const submarine = Ship('submarine', 3, [[1,5],[1,6],[1,7]]);
    Gameboard.placeShip(patrolBoat);
    Gameboard.placeShip(submarine);
    const board = Gameboard.board;
    const fleet = [patrolBoat, submarine];
    const occupiedPositions = board.flat().filter(position => position !== null);
    expect(occupiedPositions).toContain(fleet);
  })
});

describe('receiveAttack', () => {
  it('tracks missed shots', () => {
    const patrolBoat = Ship('patrolBoat', 2, [[0,4],[0,5]]);
    Gameboard.placeShip(patrolBoat);
    Gameboard.receiveAttack([0,6]);
    const expected = [[0,6]];
    expect(Gameboard.missedShots).toEqual(expect.arrayContaining(expected));
  });

  it('does not match if received does not contain expected elements', () => {
    Gameboard.receiveAttack([3,5]);
    const expected = [[9,7]];
    expect(Gameboard.missedShots).not.toEqual(expect.arrayContaining(expected));
  });

  it('hits an occupied coordinate', () => {
    const newPatrolBoat = Ship('newPatrolBoat', 2, [[0,1],[0,2]]);
    Gameboard.placeShip(newPatrolBoat);
    Gameboard.receiveAttack([0,2]);
    expect(newPatrolBoat.hits).toStrictEqual([[0,2]]);
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

