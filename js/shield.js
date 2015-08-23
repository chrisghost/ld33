'use strict'

var Shield = function(x) {
  this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'shield')

  this.sprite.anchor.setTo(0.5, 0.5);

  this.sprite.health = 500

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = game.width - x
  this.sprite.position.y = game.height - this.sprite.height

  this.sprite.body.immovable = true
  this.sprite.body.moves = false

  this.update = function() {

  }
};

module.exports = Shield;
