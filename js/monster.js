'use strict';

var Walker = require('./minions/walker.js');
var Flyer = require('./minions/flyer.js');
var Archer = require('./minions/archer.js');
var Config = require('./config.js');

var Monster = function (minionsBullets) {
  this.minionsBullets = minionsBullets

  this.sprite = game.add.sprite(
    game.world.centerX, game.world.centerY, 'monster');
  this.sprite.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
  this.sprite.body.collideWorldBounds = true

  this.sprite.position.x = 0

  this.minions = []
  this.energy = 0


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

  game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add(function(key) {
    this.spawn('archer')
  }, this)

  this.spawn = function(what) {
    var before = this.energy
    if(what == 'walker') {
      if(this.energy > Config.walker.price) {
        this.minions.push(new Walker(this))
        this.energy -= Config.walker.price
      }
    }
    else if(what == 'flyer') {
      if(this.energy > Config.flyer.price) {
        this.minions.push(new Flyer(this))
        this.energy -= Config.flyer.price
      }
    }
    else if(what == 'archer') {
      if(this.energy > Config.archer.price) {
        this.minions.push(new Archer(this))
        this.energy -= Config.archer.price
      }
    }
    //console.log(this.minions)

    if(before != this.energy) {
      Config.game.xp += before - this.energy
      if(Config.game.xp > Config.game.nextUpgrade) {
        Config.game.upgrades += 1
        Config.game.nextUpgrade = Config.game.nextUpgrade * 2
        Config.game.MAX_ENERGY = Config.game.MAX_ENERGY * 1.2
      }
    }
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

    this.energy += game.time.elapsed * (Config.energyPerSec / 1000)

    if(this.energy > Config.game.MAX_ENERGY) this.energy = Config.game.MAX_ENERGY


    game.physics.arcade.overlap(
        this.monsterBombs,
        soldiers.map(function(e) { return e.sprite }),
        this.bombHit,
        null,
        {'soldiers': soldiers} )

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
    this.soldiers.map ( function(s) {
      if(
        Phaser.Math.distance(
          s.sprite.body.center.x,
          s.sprite.body.center.y,
          bomb.body.center.x,
          bomb.body.center.y
        ) < bomb.range
      )
        s.sprite.damage(bomb.power)
    })
    bomb.kill()
  }
};

module.exports = Monster;
