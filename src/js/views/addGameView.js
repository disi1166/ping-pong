import AddGameComponent from 'js/views/addGameComponent';

var AddGameView = Backbone.View.extend({
  el: 'body',
  initialize: function() {
    this.addGameComponent = new AddGameComponent();
    this.addGameComponent.on('gameCreated', this.addGame, this);
  },
  render: function() {
    this.$el.html(this.addGameComponent.render().el);
  },
  addGame: function(game) {
    this.collection.add(game, {at: 0})
    this.trigger('gameAdded');
  }
});
export default AddGameView;
