'use strict';

var PlayScene = require('./play_scene.js');
var MenuScene = require('./menu_scene.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('bkg', 'images/background.png');
    this.game.load.image('bkg_center', 'images/bkg_center.png');
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.spritesheet('monster', 'images/monster.png', 64, 128, 3);
    //this.game.load.image('walker', 'images/walker.png');
    //this.game.load.image('flyer', 'images/flyer.png');
    this.game.load.image('bullet', 'images/bullet.png');
    //this.game.load.image('soldier', 'images/soldier.png');
    this.game.load.image('bomb', 'images/bomb.png');
    this.game.load.image('shield', 'images/shield.png');

    this.game.load.spritesheet('flyer', 'images/flyer_anim.png', 64, 64, 4);
    this.game.load.spritesheet('walker', 'images/walker_anim.png', 64, 64, 8);
    this.game.load.spritesheet('soldier', 'images/soldier_anim.png', 64, 64, 6);
    this.game.load.spritesheet('archer', 'images/archer_anim.png', 32, 50, 8);

    this.game.load.image('health_bkg', 'images/health_bkg.png');
    this.game.load.image('health', 'images/health.png');
  },

  create: function () {
    game.stage.backgroundColor = '#ffffff'
    this.game.state.start('menu');
  }
};


window.rr = function(x) { return Math.floor(x) }
window.onload = function () {
  window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('menu', MenuScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
