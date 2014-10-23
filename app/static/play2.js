'use strict';

var playState2 = {

  /************************
   * CREATE  FUNCTION     *
   ************************/
  create: function() {
    this.starDudeTheme = game.add.audio('star-dude-theme');
    this.starDudeTheme.play();
    this.createWorld();
    this.exit = game.add.sprite(2340, 100, 'exit');
    game.physics.enable(this.exit, Phaser.Physics.ARCADE);
    this.exit.body.setSize(67, 81, 0, 1);
    this.exit.anchor.setTo(0.5, 0.5);
    this.exit.body.gravity.y = 900;
    //STAR DUDE
    this.starDude = game.add.sprite(200, 150, 'star');
    game.physics.enable(this.starDude, Phaser.Physics.ARCADE);
    this.starDude.checkWorldBounds = true;
    this.starDude.outOfBoundsKill = true;
    this.starDude.body.setSize(67, 81, 0, 1);
    this.starDude.anchor.setTo(0.5, 0.5);
    this.starDude.body.bounce.y = 0.2;
    this.starDude.body.collideWorldBounds = false;
    this.starDude.body.gravity.y = 900;
    game.camera.follow(this.starDude);
    //KNIFE GUY
    this.knifeGuy = game.add.group();
    this.knifeGuy.enableBody = true;
    this.knifeGuy.physicsBodyType = Phaser.Physics.ARCADE;
    this.knifeGuy.createMultiple(7, 'knife-guy');
    this.knifeGuy.setAll('anchor.x', 0.5);
    this.knifeGuy.setAll('anchor.y', 0.5);
    //PLATFORMS
    this.platforms1 = game.add.group();
    this.platforms1.enableBody = true;
    this.platforms1.physicsBodyType = Phaser.Physics.ARCADE;
    this.platforms1.createMultiple(7, 'blocks');
    this.platforms1.setAll('anchor.x', 0.5);
    this.platforms1.setAll('anchor.y', 0.5);
    //KNIVES
    this.knives = game.add.group();
    this.knives.enableBody = true;
    this.knives.physicsBodyType = Phaser.Physics.ARCADE;
    this.knives.createMultiple(50, 'knife');
    this.knives.setAll('anchor.x', 0.5);
    this.knives.setAll('anchor.y', 0.5);
    this.knives.setAll('checkWorldBounds', true);
    this.knives.setAll('outOfBoundsKill', true);
    //THROWING STARS
    this.stars = game.add.group();
    this.stars.enableBody = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    this.stars.createMultiple(50, 'throwing-star');
    this.stars.setAll('anchor.x', 0.5);
    this.stars.setAll('anchor.y', 0.5);
    this.stars.setAll('checkWorldBounds', true);
    this.stars.setAll('outOfBoundsKill', true);
    //KEYS
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.throwKnife = game.input.keyboard.addKey(Phaser.Keyboard.S);
    //EMITTER
    this.emitter = game.add.emitter(0, 0, 15);
    this.emitter.makeParticles('star-blood');
    this.emitter.setYSpeed(-150, 150);
    this.emitter.setXSpeed(-150, 150);
    this.emitter.gravity = 0;
    this.emitter2 = game.add.emitter(0, 0, 15);
    this.emitter2.makeParticles('knife-blood');
    this.emitter2.setYSpeed(-150, 150);
    this.emitter2.setXSpeed(-150, 150);
    this.emitter2.gravity = 0;
    this.nextStar = 0;
    this.nextKnife = 0;
    this.livingEnemies = [];
    this.addEnemy();
    this.createPlatforms();
    //this.render();
  },

  /************************
   * UPDATE  FUNCTION     *
   ************************/
  update: function() {
    //COLLISIONS
    game.physics.arcade.collide(this.starDude, this.blocks);
    game.physics.arcade.collide(this.knifeGuy, this.blocks);
    game.physics.arcade.collide(this.starDude, this.platforms1);
    game.physics.arcade.collide(this.knifeGuy, this.platforms1);
    game.physics.arcade.collide(this.exit, this.blocks);
    game.physics.arcade.overlap(this.knives, this.knifeGuy, this.knifeHitsGuy, null, this);
    game.physics.arcade.overlap(this.starDude, this.knifeGuy, this.dudeOnGuy, null, this);
    game.physics.arcade.overlap(this.stars, this.starDude, this.starHitsDude, null, this);
    game.physics.arcade.overlap(this.starDude, this.exit, this.done, null, this);

    for (var i = 0; i < this.platforms1.length; i++){
      if (this.platforms1.children[i].bounceTimer < game.time.now) {
          this.platforms1.children[i].body.velocity.y *= -1;
          this.platforms1.children[i].bounceTimer = game.time.now + 1900;
      }
    }
    this.moveStarDude();
    if(game.time.now > this.nextStar){
      this.starThrow();
    }
    if(!this.starDude.inWorld){
      this.starDudeDies();
    }
  },

  /************************
   * PROJECTILE FUNCTIONS *
   ************************/
  knifeThrow: function() {
    if(game.time.now > this.nextKnife){
      this.knife = this.knives.getFirstExists(false);
      if(this.knife){
        if(this.starDude.scale.x === 1){
        this.knife.reset(this.starDude.x+52, this.starDude.y-7);
          this.knife.scale.x = 1;
          this.knife.body.velocity.x = 400;
        }else if(this.starDude.scale.x === -1){
        this.knife.reset(this.starDude.x-52, this.starDude.y-7);
          this.knife.scale.x = -1;
          this.knife.body.velocity.x = -400;
        }
        this.nextKnife = game.time.now + 200;
      }
    }
  },

  starThrow: function() {
    this.star = this.stars.getFirstExists(false);

    if (this.star && this.livingEnemies.length > 0){
      var random =  game.rnd.integerInRange(0 , this.livingEnemies.length-1);
      var shooter = this.livingEnemies[random];
      if(shooter.alive){
          this.star.reset(shooter.body.x, shooter.body.y+37);
          this.star.body.velocity.x = -400;
        }
      }
    this.nextStar = game.time.now + game.rnd.integerInRange(1970, 3190);
  },

  /************************
   * COLLISION FUNCTIONS  *
   ************************/
  dudeOnGuy: function(starDude, enemy) {
    this.starDude.kill();
    enemy.destroy();
    this.starDudeDies();
    this.emitter2.x = enemy.x;
    this.emitter2.y = enemy.y;
    this.emitter2.start(true, 600, null, 15);
  },

  knifeHitsGuy: function(knife, enemy) {
    this.livingEnemies.splice(this.livingEnemies.indexOf(enemy), 1);
    this.knife.kill();
    enemy.destroy();
    this.emitter2.x = enemy.x;
    this.emitter2.y = enemy.y;
    this.emitter2.start(true, 600, null, 15);
  },

  starHitsDude: function(star, starDude) {
    this.starDude.kill();
    this.starDudeDies();
  },

  done: function(starDude, exit) {
    this.starDudeTheme.stop();

    game.time.events.add(1000, this.startMenu, this);
  },

  /************************
   * STAR-DUDE'S CONTROLS *
   ************************/
  moveStarDude: function() {
    this.starDude.body.velocity.x = 0;
    if(this.cursors.left.isDown){
      this.starDude.scale.x = -1;
      this.starDude.body.velocity.x = -150;
      this.facing = 'left';
      if(this.jumpButton.isDown && this.starDude.body.onFloor() || this.jumpButton.isDown && this.starDude.body.touching.down){
        this.starDude.body.velocity.y = -550;
        this.jumpTimer = game.time.now + 750;
      }
    }else if(this.cursors.right.isDown){
      this.starDude.scale.x = 1;
      this.starDude.body.velocity.x = 150;
      this.facing = 'right';
      if(this.jumpButton.isDown && this.starDude.body.onFloor() || this.jumpButton.isDown && this.starDude.body.touching.down){
        this.starDude.body.velocity.y = -550;
        this.jumpTimer = game.time.now + 750;
      }
    }else if(this.jumpButton.isDown && this.starDude.body.onFloor() || this.jumpButton.isDown && this.starDude.body.touching.down){
      this.starDude.body.velocity.y = -550;
    }
    if(this.throwKnife.isDown){
      this.knifeThrow();
    }
  },

  /************************
   * SPAWNING KNIFE GUYS  *
   ************************/
  addEnemy: function() {
    this.positions = [{x:450, y:300}, {x:600, y:300}, {x:850, y:300}, {x:1050, y:300}, {x:1250, y:380}, {x:1550, y:380}, {x:1880, y:380}, {x:2270, y:380}];
    for(var i = 0; i < this.knifeGuy.length; i++){
      var enemy = this.knifeGuy.getFirstDead();

      if(!enemy){ return; }
      enemy.reset(this.positions[i].x, this.positions[i].y);
      enemy.body.setSize(47, 81, 0, -4);
      enemy.body.gravity.y = 900;
      enemy.body.bounce.y = 0.2;
      this.livingEnemies.push(enemy);
    }
  },

  /************************
   * SETUP THE WORLD      *
   ************************/
  createWorld: function() {
    this.map = game.add.tilemap('level2');
    this.map.addTilesetImage('Untitled-1');

    this.blocks = this.map.createLayer('Tile Layer 1');
    this.blocks.debug = true;
    this.blocks.resizeWorld();

    this.map.setCollisionByExclusion([0], true, 'Tile Layer 1');
  },

  /************************
   * CREATE PLATFORMS     *
   ************************/
  createPlatforms: function() {
    this.positions2 = [{x:450, y:400}, {x:600, y:400}, {x:850, y:400}, {x:1050, y:400}, {x:1250, y:480}, {x:1550, y:480}, {x:1880, y:480}, {x:2270, y:480}];
    for(var i = 0; i < this.platforms1.length; i++){
      var platform1 = this.platforms1.getFirstDead();

      if(!platform1){ return; }
      platform1.reset(this.positions2[i].x, this.positions2[i].y);
      platform1.body.immovable = true;
      platform1.body.checkCollision.down = false;
      platform1.body.allowGravity = false;
      platform1.body.bounce.set(1);
      platform1.body.velocity.y = 100;
      platform1.body.collideWorldBounds = true;
      platform1.bounceTimer = 0;
    }
  },
  /************************
   * STAR DUDE DIES       *
   ************************/
  starDudeDies: function() {
    this.emitter.x = this.starDude.x;
    this.emitter.y = this.starDude.y;
    this.emitter.start(true, 600, null, 15);
    this.starDudeTheme.stop();

    game.time.events.add(1000, this.startMenu, this);
  },

  startMenu: function() {
    game.state.start('menu');
  },
/*
  render: function() {
    game.debug.body(this.starDude);
    for (var i = 0; i < this.knifeGuy.length; i++){
      game.debug.body(this.knifeGuy.children[i]);
    }
  }*/
};
