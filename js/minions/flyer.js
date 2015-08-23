'use strict';

var Flyer = function (monster) {
  this.monster = monster

  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'flyer');
  this.sprite.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.attackOnTouch = false

  this.sprite.position.x = 0

  this.sprite.body.allowGravity = false

  this.sprite.health = 25

  this.VELOCITY = 300

  this.bombRate = 500
  this.nextBomb = 0

  this.update = function(soldiers) {
    var that = this
    var x = ((
         soldiers
         //.map(function(s) { return s.sprite.body.position.x; })
         .reduce(function(prev, cur, index, arr) {
           //console.log(prev, cur, index, arr)
           return prev + (that.sprite.body.position.x < cur.sprite.body.position.x) ? 1 : -1;
         }, 0) > 0) ? 1 : 0) * this.VELOCITY

    this.sprite.body.velocity.x = x

    if(x == 0) {
      console.log("x = 0", this.nextBomb)
      this.nextBomb += game.time.elapsed

      if(this.nextBomb >= this.bombRate) {
        this.nextBomb -= this.bombRate
        this.dropBomb()
      }
    }
  }
  this.dropBomb = function() {
    var bomb = this.monster.monsterBombs.getFirstDead()
    bomb.power = 100
    bomb.reset(this.sprite.body.position.x, this.sprite.body.position.y);
  }
};

module.exports = Flyer;
