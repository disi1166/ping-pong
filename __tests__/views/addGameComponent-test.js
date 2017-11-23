import AddGameComponent from '../../src/js/views/addGameComponent';
import GameModel from '../../src/js/models/gameModel';

describe('AddGameComponent', () => {
  let addGameComponent;

  beforeEach(() => {
    addGameComponent = new AddGameComponent();
  });

  describe('Method createGameFromPage', () => {
    it('should create a gameModel given two players and at least two set scores have been given', () => {
      addGameComponent.setScores = [[11, 2], [11, 8]];
      addGameComponent.players = [{name: 'player 1'}, {name: 'player 2'}];

      let gameModel = addGameComponent.createGameFromPage();

      expect(gameModel.get('players')[0].name).toBe('player 1');
      expect(gameModel.get('players')[1].name).toBe('player 2');

      expect(gameModel.get('setScores')[0][0]).toBe(11);
      expect(gameModel.get('setScores')[0][1]).toBe(2);
      expect(gameModel.get('setScores')[1][0]).toBe(11);
      expect(gameModel.get('setScores')[1][1]).toBe(8);
      expect(gameModel.get('winner')).toBe(1);
      expect(gameModel.get('scores')[0]).toBe(2);
      expect(gameModel.get('scores')[1]).toBe(0);
    });

    it('should return null if a player name is missing', () => {
      addGameComponent.setScores = [[11, 2], [11, 8]];
      addGameComponent.players = [{name: 'player 1'}, {}];

      let gameModel = addGameComponent.createGameFromPage();

      expect(gameModel).toBeNull();
    });

    it('should return null if same player selected twice', () => {
      addGameComponent.setScores = [[11, 2], [11, 8]];
      addGameComponent.players = [{name: 'player 1'}, {name: 'player 1'}];

      let gameModel = addGameComponent.createGameFromPage();

      expect(gameModel).toBeNull();
    });
  });

  describe('Method createGame', () => {
    it('should create a gameModel and trigger a gameCreatedEvent, given game created succesfully', () => {
      let gameModel = new GameModel();
      spyOn(addGameComponent, 'createGameFromPage').and.returnValue(gameModel);
      spyOn(addGameComponent, 'trigger');

      addGameComponent.createGame();

      expect(addGameComponent.trigger).toHaveBeenCalledWith('gameCreated', gameModel);
    });

    it('should do nothing, given game not created', () => {
      spyOn(addGameComponent, 'createGameFromPage').and.returnValue(null);
      spyOn(addGameComponent, 'trigger');

      addGameComponent.createGame();

      expect(addGameComponent.trigger).not.toHaveBeenCalled();
    });
  });
});
