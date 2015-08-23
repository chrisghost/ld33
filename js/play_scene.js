'use strict';

var Monster = require('./monster.js');
var Soldier = require('./soldier.js');
var Shield = require('./shield.js')

var PlayScene = {
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 300

    this.soldiersBullets = game.add.group()
    this.soldiersBullets.enableBody = true
    this.soldiersBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.soldiersBullets.createMultiple(100, 'bullet');

    this.soldiersBullets.setAll('anchor.x', 0.5);
    this.soldiersBullets.setAll('anchor.y', 0.5);
    this.soldiersBullets.setAll('outOfBoundsKill', true);
    this.soldiersBullets.setAll('checkWorldBounds', true);
    this.soldiersBullets.setAll('body.allowGravity', false);



    this.monster = new Monster()
    this.soldiers = [
      new Soldier(this.soldiersBullets, 140, 300, 10),
      new Shield(140 + 40),

      new Soldier(this.soldiersBullets, 50, 500, 50),
      new Shield(50 + 40)
    ]

    game.time.advancedTiming = true;
  },
  update: function() {
    this.soldiers = this.soldiers.filter(function(e) { return e.sprite.alive })
    this.monster.update(this.soldiers)
    var minions = this.monster.minions
    this.soldiers.map(function(e) {
      e.update(minions)
    })

    game.physics.arcade.overlap(
        this.soldiersBullets,
        this.monster.minions.map(function(e) { return e.sprite }),
        this.bulletHit,
        null,
        this)

    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00")
    game.debug.text(this.monster.energy || '--', 2, 34, "#00ff00")
  },
  bulletHit: function(minion, bullet) {
    console.log("HITTT")
    minion.damage(bullet.power)
    bullet.kill()
  }
};

module.exports = PlayScene;
