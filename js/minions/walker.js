'use strict';

var HealthBar = require('../healthbar.js')

var Walker = function (monster) {
  this.monster = monster

  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'walker');
  this.sprite.anchor.setTo(0.5, 0.5);

  this.sprite.item = this

  this.attackOnTouch = true
  this.power = 100
  this.attackRate = 500
  this.nextAttack = this.attackRate

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = 0
  this.sprite.position.y = game.height - 100

  this.health = new HealthBar(this.sprite.position.x, this.sprite.position.y)
  this.sprite.events.onKilled.addOnce(function() { this.health.kill() }, this)

  this.sprite.maxHealth = 500
  this.sprite.health = this.sprite.maxHealth

  this.VELOCITY = 5
  this.sprite.body.maxVelocity = 50

  this.update = function(soldiers) {
    this.health.update(this.sprite)

    var that = this
    var x = ((
         soldiers
         //.map(function(s) { return s.sprite.body.position.x; })
         .reduce(function(prev, cur, index, arr) {
           //console.log(prev, cur, index, arr)
           return prev + (that.sprite.body.position.x < cur.sprite.body.position.x) ? 1 : -1;
         }, 0) > 0) ? 1 : 0) * this.VELOCITY

    this.sprite.body.velocity.x += x
  }
  this.attack = function(what) {
    ///console.log("Attack", what)
    what.damage(this.power)

    this.sprite.body.velocity.x += (this.sprite.body.position.x - what.body.position.x) * 2
    this.sprite.body.velocity.y += this.sprite.body.position.y - what.body.position.y
    ///console.log(this.sprite.body.velocity.x, this.sprite.body.position.x - what.body.position.x)
    //console.log(this.sprite.body.velocity.y, this.sprite.body.position.y - what.body.position.y)
  }
};

module.exports = Walker;
