import GameModel from 'js/models/gameModel';
import AddGameTemplate from 'templates/addGameTemplate.html';

var AddGameComponent = Backbone.View.extend({
    tagName: 'div',
    className: 'addGame',
    template: _.template(AddGameTemplate),
    setScores: [],
    players: [{}, {}],
    events: {
      "change .addGame__selector--left": "playerOneSelected",
      "change .addGame__selector--right": "playerTwoSelected",
      "click .addGame__addButton": "createGame"
    },
    initialize: function() {
      this.generateRandomSetsScores();
    },
    render: function() {
      this.$el.html(this.template());
      this.leftSelector = this.$el.find('.addGame__selector--left')[0];
      this.rightSelector = this.$el.find('.addGame__selector--right')[0];
      return this;
    },

    createGame: function() {
      let game = this.createGameFromPage();
      if (game !== null) {
        this.trigger('gameCreated', game);
      }
    },

    createGameFromPage: function() {
      if (this.gameDetailsNotValid()) {
        return null;
      } else {
        return this.gameFromPageFields();
      }
    },

    gameDetailsNotValid: function() {
      return this.players[0].name === undefined || this.players[0].name === '' ||
        this.players[1].name === undefined || this.players[1].name === '' ||
        this.players[0].name === this.players[1].name;
    },

    gameFromPageFields: function() {
      let game = new GameModel();
      game.set({players: this.players});
      game.set({setScores: this.setScores});
      let matchScore = this.calculateMatchScore();
      game.set({scores: matchScore});
      let winner = this.getWinner(matchScore);
      game.set({winner: winner});
      return game;
    },

    calculateMatchScore: function() {
      let matchScore = [0, 0];
      _.each(this.setScores, (setScore) => {
        if (setScore[0] > setScore[1]) {
          matchScore[0]++;
        } else {
          matchScore[1]++;
        }
      });
      return matchScore;
    },
    getWinner: function(matchScore) {
      return matchScore[0] > matchScore[1] ? 1 : 2;
    },
    playerOneSelected: function() {
      this.players[0].name = this.leftSelector.value;
    },
    playerTwoSelected: function() {
      this.players[1].name = this.rightSelector.value;
    },
    generateRandomSetsScores: function() {
      let numberOfSets = this.generateNumberInRange(2, 5);
      console.log("Number of sets: " + numberOfSets);
      for (var i = 0; i < numberOfSets; i++) {
        this.setScores[i] = this.generateSetScore();
      }
      console.log("Match final score: " + this.setScores);
    },
    generateSetScore: function() {
      let currentSetScore = [0, 0];
      while(this.setNotOver(currentSetScore)) {
        this.addPointToOnePlayer(currentSetScore);
      }
      console.log("Set final score: " + currentSetScore[0] + "-" + currentSetScore[1]);
      return currentSetScore;
    },
    setNotOver: function(currentSetScore) {
      return Math.abs(currentSetScore[0] - currentSetScore[1]) < 2 ||
        (currentSetScore[0] < 11 && currentSetScore[1] < 11);
    },
    addPointToOnePlayer: function(currentSetScore) {
      let player = this.generateNumberInRange(0, 1);
      currentSetScore[player]++;
    },
    generateNumberInRange: function(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }
});
export default AddGameComponent;
