'use strict';

var Config = require('../config.js')
var HealthBar = require('../healthbar.js')

var Archer = function (monster) {
  this.minionsBullets = monster.minionsBullets
  this.monster = monster

  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'archer');
  this.sprite.anchor.setTo(0.5, 0.5);

  this.sprite.item = this

  this.attackOnTouch = Config.archer.attackOnTouch
  this.power = Config.archer.attack
  this.fireRate = Config.archer.fireRate
  this.fireRange = Config.archer.fireRange()
  this.nextFire = Config.archer.nextFire

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = 0
  this.sprite.position.y = game.height - 100

  this.health = new HealthBar(this.sprite.position.x, this.sprite.position.y)
  this.sprite.events.onKilled.addOnce(function() { this.health.kill() }, this)

  this.sprite.maxHealth = Config.archer.health
  this.sprite.health = this.sprite.maxHealth

  this.VELOCITY = 5
  this.sprite.body.maxVelocity = 50

  this.update = function(soldiers) {
    this.health.update(this.sprite)

    var that = this
    var inRange = soldiers
         .map(function(s) {
            return {
              s: s,
              dist: Phaser.Math.distance(
                  s.sprite.body.center.x,
                  s.sprite.body.center.y,
                  that.sprite.body.center.x,
                  that.sprite.body.center.y
                )
            }
          }).filter( function(e) {
            return e.dist < that.fireRange
          })

    if(inRange.length > 0) {
      if (game.time.now > this.nextFire && this.minionsBullets.countDead() > 0) {
        this.nextFire = game.time.now + this.fireRate;

        var bullet = this.minionsBullets.getFirstDead();

        bullet.power = this.power

        bullet.reset(this.sprite.body.center.x, this.sprite.body.center.y);

        var dest = inRange[0].s
console.log(dest)

        //console.log(game.physics.arcade.moveToObject(bullet, closest, 500))
        bullet.rotation = game.physics.arcade.moveToXY(
            bullet,
            dest.sprite.position.x,
            dest.sprite.position.y,
            1500);
      }
      this.sprite.body.velocity.x = 0
    }
    else this.sprite.body.velocity.x += this.VELOCITY
  }
};

module.exports = Archer;
