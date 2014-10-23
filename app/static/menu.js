'use strict';

var menuState = {

  create: function() { 
    this.starDudeTheme = game.add.audio('star-dude-theme');
    this.starDudeTheme.play();
    this.stars = game.add.group();
    this.stars.enableBody = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    this.stars.createMultiple(1400, 'star-blood');
    game.time.events.loop(300, this.addStar, this);
    var nameLabel = game.add.text(400, 80, 'STAR-DUDE', { font: '50px Arial', fill: '#ffffff' });
    nameLabel.anchor.setTo(0.5, 0.5);

    var scoreLabel = game.add.text(400, 225, '(in advance)', { font: '25px Arial', fill: '#ffffff' });
    scoreLabel.anchor.setTo(0.5, 0.5);

    var startLabel = game.add.text(400, 520, 'press the up arrow key to start', { font: '25px Arial', fill: '#ffffff' });
    startLabel.anchor.setTo(0.5, 0.5);

    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    
    upKey.onDown.addOnce(this.start, this);
  },

  start: function() {
    this.starDudeTheme.stop();
    game.state.start('play'); 
  },
  addStar: function() {
    var star = this.stars.getFirstDead();
    star.anchor.setTo(0.5, 0.5);
    star.reset(game.rnd.integerInRange(50, 550), game.rnd.integerInRange(50 , 550));
    star.body.velocity.x = game.rnd.integerInRange(400 , 1200) * Phaser.Math.randomSign();
    star.body.velocity.y = game.rnd.integerInRange(400 , 1200) * Phaser.Math.randomSign();
    star.checkWorldBounds = true;
    star.outOfBoundsKill = false;
    star.body.gravity.y = 0;
    game.world.wrap(star);
  }
};
