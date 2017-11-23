import GameModel from 'js/models/gameModel';
import GamesCollection from 'js/collections/gamesCollection';
import GameComponent from 'js/views/gameComponent';
import GamesTemplate from 'templates/gamesTemplate.html';

var GamesComponent = Backbone.View.extend({
    className: 'games',
    template: _.template(GamesTemplate),
    events: {
      'click .games__addButton': 'addGame'
    },
    initialize: function() {
      this.collection.on('remove', this.render, this);
      this.collection.on('add', this.render, this);
    },
    render: function() {
      this.$el.html(this.template());
      this.gamesList = this.$el.find('.games__gamesList');
      this.collection.each(this.renderGame, this);
      return this;
    },
    renderGame: function(game) {
      var gameComponent = new GameComponent({model: game});
      this.gamesList.append(gameComponent.render().el);
    },
    addGame: function() {
      this.trigger('addGame');
    }
});
export default GamesComponent;
