'use strict'

var HealthBar = require('./healthbar.js')
var Config = require('./config.js')

var Soldier = function(bullets, x, rate, power) {
  this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'soldier')

  this.sprite.anchor.setTo(0.5, 0.5);

  this.sprite.maxHealth = Config.soldier.maxHealth
  this.sprite.health = Config.soldier.health

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = game.width - x
  this.sprite.position.y = game.height - this.sprite.height

  this.health = new HealthBar(this.sprite.position.x, this.sprite.position.y)
  this.sprite.events.onKilled.addOnce(function() { this.health.kill() }, this)

  this.sprite.body.immovable = true
  this.sprite.body.moves = false

  this.bullets = bullets

  this.power = Config.soldier.attack
  this.fireRate = Config.soldier.fireRate
  this.nextFire = Config.soldier.nextFire

  this.update = function(monsters) {

    if (game.time.now > this.nextFire && this.bullets.countDead() > 0 && monsters.length > 0) {

      var that = this

      var closest = monsters.reduce(function(prev, cur, index, arr) {
        if(prev == null) return cur;

        if(Phaser.Math.distance(
              that.sprite.body.position.x,
              that.sprite.body.position.y,
              cur.sprite.body.position.x,
              cur.sprite.body.position.y)
            <
        Phaser.Math.distance(
              that.sprite.body.position.x,
              that.sprite.body.position.y,
              prev.sprite.body.position.x,
              prev.sprite.body.position.y)
        ) return cur;
        else
          return prev;

      }, null )

      this.nextFire = game.time.now + this.fireRate;

      var bullet = this.bullets.getFirstDead();

      bullet.power = this.power

      bullet.reset(this.sprite.body.center.x, this.sprite.body.center.y);

      //console.log(game.physics.arcade.moveToObject(bullet, closest, 500))
      bullet.rotation = game.physics.arcade.moveToXY(
          bullet,
          closest.sprite.position.x,
          closest.sprite.position.y,
          Config.soldier.bulletSpeed);

      //console.log(bullet)
    }

    if(monsters.length == 0) {
      this.sprite.health += (Config.soldier.healthPerSec / 1000) * game.time.elapsed
      if(this.sprite.health > Config.soldier.maxHealth) this.sprite.health = Config.soldier.maxHealth
    }

    this.health.update(this.sprite)
  }

};

module.exports = Soldier;
