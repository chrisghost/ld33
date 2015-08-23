'use strict'

var HealthBar = require('./healthbar.js')
var Config = require('./config.js')

var Shield = function(x) {
  this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'shield')

  this.sprite.anchor.setTo(0.5, 0.5);

  this.sprite.maxHealth = Config.shield.health
  this.sprite.health = this.sprite.maxHealth

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = game.width - x
  this.sprite.position.y = game.height - this.sprite.height

  this.health = new HealthBar(this.sprite.position.x, this.sprite.position.y)
  this.sprite.events.onKilled.addOnce(function() { this.health.kill() }, this)

  this.sprite.body.immovable = true
  this.sprite.body.moves = false

  this.update = function() {
    this.health.update(this.sprite)
  }
};

module.exports = Shield;
