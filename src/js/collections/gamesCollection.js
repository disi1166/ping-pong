import GameModel from 'js/models/gameModel';

var GamesCollection = Backbone.Collection.extend({
  model: GameModel
});

export default GamesCollection;
