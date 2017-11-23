import GameComponent from '../../src/js/views/gameComponent';
import GameModel from '../../src/js/models/gameModel';

describe('GameComponent', () => {
  let gameComponent;
  let gameModel;
  beforeEach(() => {
    gameModel = new GameModel();
    gameComponent = new GameComponent({model: gameModel});
  });

  it('should be able to remove itself from the list', () => {
    spyOn(gameModel, 'destroy');

    gameComponent.remove();

    expect(gameModel.destroy).toHaveBeenCalled();
  });
});
