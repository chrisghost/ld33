'use strict';

var Monster = require('./monster.js');
var Soldier = require('./soldier.js');
var Shield = require('./shield.js')
var Config = require('./config.js')

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


    this.minionsBullets = game.add.group()
    this.minionsBullets.enableBody = true
    this.minionsBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.minionsBullets.createMultiple(100, 'bullet');

    this.minionsBullets.setAll('anchor.x', 0.5);
    this.minionsBullets.setAll('anchor.y', 0.5);
    this.minionsBullets.setAll('outOfBoundsKill', true);
    this.minionsBullets.setAll('checkWorldBounds', true);
    this.minionsBullets.setAll('body.allowGravity', false);

    this.monster = new Monster(this.minionsBullets)
    this.soldiers = []

    var minX = 70
    var maxX = 300

    for(var i = 0; i < Config.game.lvl; i++) {
      var x = Math.random() * (maxX - minX) + minX
      this.soldiers.push(new Soldier(this.soldiersBullets, x, 300, 10))
      this.soldiers.push(new Shield(x + 40))
    }

    game.time.advancedTiming = true;

    document.getElementById("info").style.display = ''

    this.updateInfos = function() {
      document.getElementById("energybar").style.width = (this.monster.energy / Config.game.MAX_ENERGY)*100+"%"
      document.getElementById("energymax").innerHTML = rr(Config.game.MAX_ENERGY)
      document.getElementById("monster-energy").innerHTML = rr(this.monster.energy)
      document.getElementById("xpbar").style.width = ((Config.game.xp - Config.game.nextUpgrade / 2) / (Config.game.nextUpgrade / 2)) * 100+"%"
      document.getElementById("xptext").innerHTML = rr(Config.game.xp) +" / "+ rr(Config.game.nextUpgrade)

    }

    this.displayUpgrades = function() {
      document.getElementById("upgrades").innerHTML = ''
      var that = this
      var buy = function(mob, skill) {
        return function() {
          if(Config.game.upgrades > 0) {
            Config.game.upgrades -= 1

            Config.game.boost[mob][skill].lvl += 1
            Config[mob][skill] = Config[mob][skill] * 1.1
            Config[mob].price = Config[mob].price * 1.2

            that.displayUpgrades()
          }
        }
      }

      var html = document.createElement("div")
      html.style.cssText = 'text-align:right'
      var l = document.createElement("h2")
      l.innerHTML = "LEVEL "+Config.game.lvl+""
      html.appendChild(l)

      var h = document.createElement("h2")
      h.innerHTML = "UPGRADES ("+Config.game.upgrades+")"

      html.appendChild(h)
      html.appendChild(document.createTextNode("Archer (cost: "+rr(Config.archer.price)+")"))

      var input = document.createElement("input")
      input.type='button'
      input.value="Attack ("+Config.game.boost.archer.attack.lvl+")"
      input.onclick = buy('archer', 'attack')
      html.appendChild(input)

      html.appendChild(document.createTextNode("  "))

      var input2 = document.createElement("input")
      input2.type='button'
      input2.value="Health ("+Config.game.boost.archer.health.lvl+")"
      input2.onclick = buy('archer', 'health')
      html.appendChild(input2)

      html.appendChild(document.createTextNode("  "))

      var input3 = document.createElement("input")
      input3.type='button'
      input3.value="Range ("+Config.game.boost.archer.range.lvl+")"
      input3.onclick = buy('archer', 'range')
      html.appendChild(input3)

      html.appendChild(document.createElement("hr"))
      html.appendChild(document.createTextNode("Walker (cost: "+rr(Config.walker.price)+")"))

      var input4 = document.createElement("input")
      input4.type='button'
      input4.value="Attack ("+Config.game.boost.walker.attack.lvl+")"
      input4.onclick = buy('walker', 'attack')
      html.appendChild(input4)

      html.appendChild(document.createTextNode("  "))

      var input5 = document.createElement("input")
      input5.type='button'
      input5.value="Health ("+Config.game.boost.walker.health.lvl+")"
      input5.onclick = buy('walker', 'health')
      html.appendChild(input5)

      html.appendChild(document.createElement("hr"))
      html.appendChild(document.createTextNode("Flyer (cost: "+rr(Config.flyer.price)+")"))

      var input6 = document.createElement("input")
      input6.type='button'
      input6.value="Attack ("+Config.game.boost.flyer.attack.lvl+")"
      input6.onclick = buy('flyer', 'attack')
      html.appendChild(input6)

      html.appendChild(document.createTextNode("  "))

      var input7 = document.createElement("input")
      input7.type='button'
      input7.value="Health ("+Config.game.boost.flyer.health.lvl+")"
      input7.onclick = buy('flyer', 'health')
      html.appendChild(input7)

      document.getElementById("upgrades").appendChild(html)

    }

    this.displayUpgrades()


    game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(function(key) {
      this.monster.spawn('walker')
      this.displayUpgrades()
    }, this)

    game.input.keyboard.addKey(Phaser.Keyboard.V).onDown.add(function(key) {
      this.monster.spawn('flyer')
      this.displayUpgrades()
    }, this)

    game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add(function(key) {
      this.monster.spawn('archer')
      this.displayUpgrades()
    }, this)
  },
  update: function() {
    this.updateInfos()
    this.soldiers = this.soldiers.filter(function(e) { return e.sprite.alive })
    this.monster.update(this.soldiers)
    var minions = this.monster.minions
    var that = this
    this.soldiers.map(function(e) {
      e.update(minions, that.minionsBullets.countLiving() + that.monster.monsterBombs.countLiving() == 0)
    })

    game.physics.arcade.overlap(
        this.soldiersBullets,
        this.monster.minions.map(function(e) { return e.sprite }),
        this.bulletHit,
        null,
        this)

    game.physics.arcade.overlap(
        this.minionsBullets,
        this.soldiers.map(function(e) { return e.sprite }),
        this.bulletHit,
        null,
        this)

    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00")

    //game.debug.text(this.monster.minions.map(function(e) { return e.sprite.health+" / "+e.sprite.maxHealth } ).join(', ') || '--', 2, 64, "#00ff00")

    if(this.soldiers.length == 0) {
      Config.game.lvl += 1
      game.state.start('menu')
      localStorage.setItem("com_chradr_ld33", JSON.stringify(Config))
    }
  },
  bulletHit: function(minion, bullet) {
    //console.log("HITTT", minion)
    minion.damage(bullet.power)
    bullet.kill()
  }
};

module.exports = PlayScene;
