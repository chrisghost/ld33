'use strict';

var Config = require('./config.js')

var MenuScene = {
  create: function () {
    this.bkg = this.game.add.sprite(0, 0, 'bkg');
    this.bkg_center = this.game.add.sprite(0, 100, 'bkg_center');

    var style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };

    var text = game.add.text(0, 0, "You are the Monster!", style);
    text.setTextBounds(0, 100, 800, 100);

    style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    var text2 = game.add.text(0, 100, "You are at level #"+Config.game.lvl, style);
    text2.setTextBounds(0, 300, 800, 100);

    var styleSmall = { font: "bold 23px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle" };
    var text3 = game.add.text(0, 150, "Your XP : "+Config.game.xp, styleSmall);
    text3.setTextBounds(300, 300, 800, 100);

    var text4 = game.add.text(0, 180, "Your Energy : "+rr(Config.game.MAX_ENERGY), styleSmall);
    text4.setTextBounds(300, 300, 800, 100);

    //var text6 = game.add.text(0, 210, "You must destroy the defendants ", styleSmall);
    //text6.setTextBounds(200, 300, 800, 100);

    var text7 = game.add.text(0, 240, "Spawn monster with C, V and B", styleSmall);
    text7.setTextBounds(200, 300, 800, 100);

    var text8 = game.add.text(0, 270, "C - Demon's child - Ground unit", styleSmall);
    text8.setTextBounds(200, 300, 800, 100);

    var text9 = game.add.text(0, 300, "V - Sky's doomer - Flying unit", styleSmall);
    text9.setTextBounds(200, 300, 800, 100);

    var text10 = game.add.text(0, 330, "B - Hell's sniper- Ranged unit", styleSmall);
    text10.setTextBounds(200, 300, 800, 100);

    var styleSmall2 = { font: "23px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    var text11 = game.add.text(0, 370, "Spawning monsters costs Energy", styleSmall2);
    text11.setTextBounds(200, 300, 800, 100);

    var text11 = game.add.text(0, 395, "Energy refills when no monsters are alive", styleSmall2);
    text11.setTextBounds(200, 300, 800, 100);

    var text12 = game.add.text(0, 420, "Ennemies life recharges when no monsters are alive", styleSmall2);
    text12.setTextBounds(200, 300, 800, 100);


    var text13 = game.add.text(0, 460, "Don't forget to upgrade your units!", styleSmall2);
    text13.setTextBounds(200, 300, 800, 100);


    var text5 = game.add.text(0, 520, "Press SPACE to start next level!", style);
    text5.setTextBounds(0, 300, 800, 100);

    document.getElementById("info").style.display = 'none'
    document.getElementById("upgrades").innerHTML = ''

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(key) {
      game.state.start('play')
    }, this)
  }
};

module.exports = MenuScene;

