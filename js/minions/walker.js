'use strict';

var Walker = function () {
  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'walker');
  this.sprite.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = 0

  this.VELOCITY = 100

  this.update = function(soldiers) {
    var that = this
    var x = ((
         soldiers
         //.map(function(s) { return s.sprite.body.position.x; })
         .reduce(function(prev, cur, index, arr) {
           console.log(prev, cur, index, arr)
           return prev + (that.sprite.body.position.x < cur.sprite.body.position.x) ? 1 : -1;
         }, 0) > 0) ? 1 : 0) * this.VELOCITY

    this.sprite.body.velocity.x = x
  }
};

module.exports = Walker;
