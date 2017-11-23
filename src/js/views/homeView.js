import GamesComponent from 'js/views/gamesComponent';

var HomeView = Backbone.View.extend({
  el: 'body',
  initialize: function() {
    this.gamesComponent = new GamesComponent({collection: this.collection});
    this.gamesComponent.on('addGame', this.addGame, this);
  },
  render: function() {
    this.$el.html(this.gamesComponent.render().el);
  },
  addGame: function() {
    this.trigger('addGame');
  }
});
export default HomeView;
