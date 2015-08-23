'use strict';

var Config = JSON.parse(localStorage.getItem("com_chradr_ld33")) || {
  game: {
    MAX_ENERGY: 5000,
    xp: 0,
    nextUpgrade: 1000,
    upgrades: 0,
    lvl: 1,
    boost: {
      archer : {
        attack: { lvl: 0, boostPerLevel: 30 },
        health: { lvl: 0, boostPerLevel: 100 },
        range: { lvl: 0, boostPerLevel: 50 }
      },
      flyer : {
        attack: { lvl: 0, boostPerLevel: 20 },
        health: { lvl: 0, boostPerLevel: 70 }
      },
      walker : {
        attack: { lvl: 0, boostPerLevel: 100 },
        health: { lvl: 0, boostPerLevel: 100 }
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
    health: 200//function() { return 200 + Config.game.boost.walker.health.get() }
  },
  shield: {
    health: 500
  },
  soldier: {
    health: 500,
    maxHealth: 1000,
    healthPerSec: 500,
    fireRate: 100,
    nextFire: 100,
    attack: 20,
    bulletSpeed: 2500
  }
}

module.exports = Config;
