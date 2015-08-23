'use strict';

var Config = {
  game: {
    MAX_ENERGY: 5000,
    xp: 0,
    nextUpgrade: 1000,
    upgrades: 0,
    lvl: 1,
    boost: {
      archer : {
        attack: { lvl: 0, boostPerLevel: 30, get: function() { return this.lvl * this.boostPerLevel } },
        health: { lvl: 0, boostPerLevel: 100, get: function() { return this.lvl * this.boostPerLevel } },
        range: { lvl: 0, boostPerLevel: 50, get: function() { return this.lvl * this.boostPerLevel } }
      },
      flyer : {
        attack: { lvl: 0, boostPerLevel: 20, get: function() { return this.lvl * this.boostPerLevel } },
        health: { lvl: 0, boostPerLevel: 70, get: function() { return this.lvl * this.boostPerLevel } }
      },
      walker : {
        attack: { lvl: 0, boostPerLevel: 100, get: function() { return this.lvl * this.boostPerLevel } },
        health: { lvl: 0, boostPerLevel: 100, get: function() { return this.lvl * this.boostPerLevel } }
      }
    }
  },
  energyPerSec: 1000,
  archer : {
    price: 1000,
    attackOnTouch : false,
    attack : 50,//function() { return 50 + Config.game.boost.archer.attack.get() },
    fireRate : 500,
    range : 300,//function() { return 300 + Config.game.boost.archer.range.get() },
    nextFire : 200,
    health : 50//function() { return 50 + Config.game.boost.archer.health.get() }
  },
  flyer: {
    price: 700,
    health : 100,//function() { return 100 + Config.game.boost.flyer.health.get() },
    bombRate: 1000,
    bombExplosionRange: 100,
    attack: 50,//function() { return 50 + Config.game.boost.flyer.attack.get() }
  },
  walker: {
    price: 300,
    attackOnTouch : true,
    attack : 100,//function() { return 100 + Config.game.boost.walker.attack.get() },
    attackRate : 500,
    nextAttack : 500,
    health: 200,//function() { return 200 + Config.game.boost.walker.health.get() }
  },
  shield: {
    health: 500
  },
  soldier: {
    health: 1000,
    maxHealth: 2000,
    healthPerSec: 500,
    fireRate: 100,
    nextFire: 100,
    power: 50,
    bulletSpeed: 2500
  }
}

module.exports = Config;
