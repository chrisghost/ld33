'use strict'

var HealthBar = function(x ,y) {
  this.sprite_bkg = game.add.sprite(x, y, 'health_bkg')
  //this.sprite_bkg.anchor.setTo(0.5, 0.5)

  this.sprite = game.add.sprite(x, y, 'health')
  //this.sprite.anchor.setTo(0.5, 0.5)

  this.sprite.cropEnabled = true

  this.kill = function() {
    this.sprite.kill()
    this.sprite_bkg.kill()
  }

  this.update = function(sp) {
    this.sprite.width = (sp.health / sp.maxHealth) * this.sprite_bkg.width

    this.sprite_bkg.position.x = sp.position.x - 16
    this.sprite_bkg.position.y = sp.position.y - 40

    this.sprite.position.x = sp.position.x - 16
    this.sprite.position.y = sp.position.y - 40
  }
}

module.exports = HealthBar;
