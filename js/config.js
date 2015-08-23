'use strict';

var Config = {
  MAX_ENERGY: 5000,
  energyPerSec: 1000,
  archer : {
    price: 1000,
    attackOnTouch : false,
    power : 50,
    fireRate : 500,
    fireRange : 200,
    nextFire : 200,
    health : 50
  },
  flyer: {
    price: 300,
    health : 200,
    bombRate: 1000,
    bombExplosionRange: 100,
    power: 100
  },
  walker: {
    price: 300,
    attackOnTouch : true,
    power : 100,
    attackRate : 500,
    nextAttack : 500,
    health: 200
  },
  shield: {
    health: 500
  },
  soldier: {
    health: 500,
    fireRate: 100,
    nextFire: 100,
    power: 50
  }
}

module.exports = Config;
