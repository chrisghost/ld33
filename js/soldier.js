'use strict'

var Soldier = function() {
  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'soldier');
  this.sprite.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = game.width - 50

};

module.exports = Soldier;
