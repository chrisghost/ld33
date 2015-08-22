'use strict';

var Monster = require('./monster.js');
var Soldier = require('./soldier.js');

var PlayScene = {
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 300

    this.monster = new Monster()
    this.soldiers = [new Soldier()]

    game.time.advancedTiming = true;
  },
  update: function() {
    this.monster.update(this.soldiers)
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00")
  }
};

module.exports = PlayScene;
