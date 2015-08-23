'use strict';

var MenuScene = {
  init: function(lvl) {
    this.lvl = lvl || 1
  },
  create: function () {

    var style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };

    var text = game.add.text(0, 0, "You are the Monster!", style);
    text.setTextBounds(0, 100, 800, 100);

    var text2 = game.add.text(0, 200, "You are at level #"+this.lvl, style);
    text2.setTextBounds(0, 300, 800, 100);

    var text3 = game.add.text(0, 300, "Press SPACE to start next level!", style);
    text3.setTextBounds(0, 300, 800, 100);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(key) {
      game.state.start('play',  true, false, this.lvl);
    }, this)
  }
};

module.exports = MenuScene;

