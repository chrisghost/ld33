'use strict';

var Walker = require('./minions/walker.js');

var Monster = function () {
  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'monster');
  this.sprite.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = 0

  this.minions = []

  var key = game.input.keyboard.addKey(Phaser.Keyboard.C)
  key.onDown.add(function(key) {

    this.minions.push(new Walker())

        console.log(this.minions)
  }, this)
  this.update = function(soldiers) {
    //console.log(soldiers)
    this.minions.map(function(e) { e.update(soldiers); })
  }
};

module.exports = Monster;
