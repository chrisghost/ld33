'use strict';

var HealthBar = require('../healthbar.js')
var Config = require('../config.js')

var Flyer = function (monster) {
  this.monster = monster

  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'flyer');
  this.sprite.anchor.setTo(0.5, 0.5);
  this.anim = this.sprite.animations.add('fly')
  this.sprite.play('fly', 10, true)

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.attackOnTouch = false

  this.sprite.position.x = 0
  this.sprite.position.y = (game.height / 2) + (200 * (Math.random() - 0.5))

  this.health = new HealthBar(this.sprite.position.x, this.sprite.position.y)
  this.sprite.events.onKilled.addOnce(function() { this.health.kill() }, this)

  this.sprite.body.allowGravity = false

  this.sprite.maxHealth = Config.flyer.health
  this.sprite.health = this.sprite.maxHealth

  this.VELOCITY = 300

  this.bombRate = Config.flyer.bombRate
  this.nextBomb = this.bombRate

  this.update = function(soldiers) {
    this.health.update(this.sprite)

    var that = this
/*
    var x = ((
         soldiers
         //.map(function(s) { return s.sprite.body.position.x; })
         .reduce(function(prev, cur, index, arr) {
           //console.log(prev, cur, index, arr)
           return prev + (that.sprite.body.position.x < cur.sprite.body.position.x) ? 1 : -1;
         }, 0) > 0) ? 1 : 0) * this.VELOCITY
*/

    var soldierUnder = soldiers.map( function(s) {
      if(Math.abs(s.sprite.position.x - that.sprite.position.x) < 10) return true
      else return false
    }).filter(function(a) { return a }).length > 0

    if(soldierUnder)
      this.sprite.body.velocity.x = 0
    else
      this.sprite.body.velocity.x = this.VELOCITY

    if(soldierUnder) {
      //console.log("x = 0", this.nextBomb, this.bombRate, game.time.elapsed)
      this.nextBomb += game.time.elapsed

      if(this.nextBomb >= this.bombRate) {
        this.nextBomb -= this.bombRate
        this.dropBomb()
      }
    }
  }
  this.dropBomb = function() {
    var bomb = this.monster.monsterBombs.getFirstDead()
    bomb.power = Config.flyer.attack
    bomb.range = Config.flyer.bombExplosionRange
    bomb.reset(this.sprite.body.center.x, this.sprite.body.bottom);
  }
};

module.exports = Flyer;
