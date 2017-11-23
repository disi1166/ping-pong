import GameModel from '../../src/js/models/gameModel';

describe('GameModel', () => {
  let gameModel;
  beforeEach(() => {
    gameModel = new GameModel(
      {
        players: [
          {name: "Andrea Di Simone"},
          {name: "Vasilis Loumanis"}
        ],
        winner: 1,
        scores: [
          "3",
          "2"
        ],
        setScores: [
          ["11", "8"],
          ["11", "7"],
          ["1", "11"],
          ["3", "11"],
          ["11", "6"],
        ]
      }
    );
  });

  it('should be populated with the attributes from the input json', () => {
    expect(gameModel.get('players')[0].name).toBe('Andrea Di Simone');
    expect(gameModel.get('players')[1].name).toBe('Vasilis Loumanis');
    expect(gameModel.get('winner')).toBe(1);
    expect(gameModel.get('scores')[0]).toBe('3');
    expect(gameModel.get('scores')[1]).toBe('2');
    expect(gameModel.get('setScores')[0][0]).toBe('11');
    expect(gameModel.get('setScores')[0][1]).toBe('8');
    expect(gameModel.get('setScores')[1][0]).toBe('11');
    expect(gameModel.get('setScores')[1][1]).toBe('7');
    expect(gameModel.get('setScores')[2][0]).toBe('1');
    expect(gameModel.get('setScores')[2][1]).toBe('11');
    expect(gameModel.get('setScores')[3][0]).toBe('3');
    expect(gameModel.get('setScores')[3][1]).toBe('11');
    expect(gameModel.get('setScores')[4][0]).toBe('11');
    expect(gameModel.get('setScores')[4][1]).toBe('6');
  });
});
