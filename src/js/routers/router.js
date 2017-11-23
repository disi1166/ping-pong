import Backbone from 'backbone';
import HomeView from 'js/views/homeView';
import AddGameView from 'js/views/addGameView';
import GameModel from 'js/models/gameModel';
import GamesCollection from 'js/collections/gamesCollection';

var Router = Backbone.Router.extend({
  routes: {
    ""       : "home",
    "addGame": "addGame"
  },

  currentView: null,
  gamesCollection: null,

  initialize: function() {
    let game1 = new GameModel(games[0]);
    let game2 = new GameModel(games[1]);
    let game3 = new GameModel(games[2]);
    this.gamesCollection = new GamesCollection();
    this.gamesCollection.add(game1);
    this.gamesCollection.add(game2);
    this.gamesCollection.add(game3);
  },

  home: function() {
    this.navigate('');
    this.currentView = new HomeView({collection: this.gamesCollection});
    this.currentView.on('addGame', this.addGame, this);
    this.currentView.render();
  },

  addGame: function() {
    this.navigate('addGame');
    this.currentView = new AddGameView({collection: this.gamesCollection});
    this.currentView.on('gameAdded', this.home, this);
    this.currentView.render();
  }
});

var games = [
  {
    players: [
      {name: "Andrea Di Simone", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6cMr_Ai7-AZdfc3AMY4wFDD39Mu175wK7jiDnBASS2kx8bi3DDg'},
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
      ["11", "6"]
    ]
  },
  {
    players: [
      {name: "Marco Rossi"},
      {name: "Simone Verdi"}
    ],
    winner: 2,
    scores: [
      "1",
      "2"
    ],
    setScores: [
      ["11", "8"],
      ["6", "11"],
      ["10", "12"]
    ]
  },
  {
    players: [
      {name: "Vincenzo Cani"},
      {name: "Fabio Gatti"}
    ],
    winner: 1,
    scores: [
      "2",
      "0"
    ],
    setScores: [
      ["11", "8"],
      ["11", "7"]
    ]
  }
];

export default Router;
