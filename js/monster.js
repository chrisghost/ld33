'use strict';

var Walker = require('./minions/walker.js');
var Flyer = require('./minions/flyer.js');

var Monster = function () {
  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'monster');
  this.sprite.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = 0

  this.minions = []
  this.energy = 0
  this.MAX_ENERGY = 2000


  this.monsterBombs = game.add.group()
  this.monsterBombs.enableBody = true
  this.monsterBombs.physicsBodyType = Phaser.Physics.ARCADE;
  this.monsterBombs.createMultiple(20, 'bomb');

  this.monsterBombs.setAll('anchor.x', 0.5);
  this.monsterBombs.setAll('anchor.y', 0.5);
  this.monsterBombs.setAll('outOfBoundsKill', true);
  this.monsterBombs.setAll('checkWorldBounds', true);
  this.monsterBombs.setAll('body.allowGravity', true);

  game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(function(key) {
    this.spawn('walker')
  }, this)

  game.input.keyboard.addKey(Phaser.Keyboard.V).onDown.add(function(key) {
    this.spawn('flyer')
  }, this)

  this.spawn = function(what) {
    if(what == 'walker') {
      if(this.energy > 1000) {
        this.minions.push(new Walker(this))
        this.energy -= 1000
      }
    }
    else if(what == 'flyer') {
      if(this.energy > 600) {
        this.minions.push(new Flyer(this))
        this.energy -= 600
      }
    }
    console.log(this.minions)
  }
  this.monsterTouchSoldier = function(monster, soldier) {
    //console.log(monster, monster.nextAttack , soldier.attackRate, monster.attackRate, "\<monsterTouchSoldier\>")
      monster.item.nextAttack += game.time.elapsed

      if(monster.item.nextAttack >= monster.item.attackRate) {
        monster.item.nextAttack -= monster.item.attackRate
        monster.item.attack(soldier)
      }
  }

  this.update = function(soldiers) {
    //console.log(soldiers)

    this.energy += game.time.elapsed * 2

    if(this.energy > this.MAX_ENERGY) this.energy = this.MAX_ENERGY


    game.physics.arcade.overlap(
        this.monsterBombs,
        soldiers.map(function(e) { return e.sprite }),
        this.bombHit,
        null,
        this)

    //console.log( this.minions.filter(function(e) { return e.attackOnTouch }))
    game.physics.arcade.collide(
        this.minions.filter(function(e) { return e.attackOnTouch }).map(function(e) { return e.sprite }),
        soldiers.map(function(e) { return e.sprite }),
        //function(x, y) { console.log(x, y, "DWQDQ") },
        this.monsterTouchSoldier,
        null,
        this)


    this.minions = this.minions.filter(function(e) { return e.sprite.alive })
    this.minions.map(function(e) { e.update(soldiers); })
  }
  this.bombHit = function(soldier, bomb) {
    soldier.damage(bomb.power)
    bomb.kill()
  }
};

module.exports = Monster;
