import GameModel from 'js/models/gameModel';
import GameTemplate from 'templates/gameTemplate.html';
import defaultImage from 'images/defaultImage.jpeg'

var GameComponent = Backbone.View.extend({
    tagName: 'div',
    className: 'game',
    events: {
      'click .game__delete-icon': 'remove'
    },
    template:  _.template(GameTemplate),
    model: GameModel,
    render: function() {
      if (this.model.get('players')[0].image == undefined) {
        this.model.get('players')[0].image = defaultImage;
      }
      if (this.model.get('players')[1].image == undefined) {
        this.model.get('players')[1].image = defaultImage;
      }
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    remove: function() {
      this.model.destroy();
    }
});
export default GameComponent;
