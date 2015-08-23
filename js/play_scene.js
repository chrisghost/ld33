'use strict';

var Monster = require('./monster.js');
var Soldier = require('./soldier.js');
var Shield = require('./shield.js')

var PlayScene = {
  init: function (lvl) {
    this.lvl = lvl || 1
  },
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
    this.soldiers = []

    var minX = 0
    var maxX = 300

    for(var i = 0; i < this.lvl; i++) {
      var x = Math.random() * (maxX - minX) + minX
      this.soldiers.push(new Soldier(this.soldiersBullets, x, 300, 10))
      this.soldiers.push(new Shield(x + 40))
    }

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

    //game.debug.text(this.monster.minions.map(function(e) { return e.sprite.health+" / "+e.sprite.maxHealth } ).join(', ') || '--', 2, 64, "#00ff00")

    if(this.soldiers.length == 0)
      game.state.start('menu', true, false, this.lvl + 1)
  },
  bulletHit: function(minion, bullet) {
    console.log("HITTT", minion)
    minion.damage(bullet.power)
    bullet.kill()
  }
};

module.exports = PlayScene;
