'use strict';

var loadState = {

  preload: function () {
    game.load.image('star', '/public/assets/star-dude.png');
    game.load.image('exit', '/public/assets/exit.png');
    game.load.image('throwing-star', '/public/assets/star.png');
    game.load.image('knife', '/public/assets/knife.png');
    game.load.image('ground', '/public/assets/platform.png');
    game.load.image('knife-guy', '/public/assets/knife-guy.png');
    game.load.image('knife-guy2', '/public/assets/knife-guy2.png');
    game.load.image('star-blood', '/public/assets/star-blood.png');
    game.load.image('knife-blood', '/public/assets/knife-blood.png');
    game.load.tilemap('level1', '/public/assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', '/public/assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('blocks', '/public/assets/blocks.png');
    game.load.image('blocks2', '/public/assets/blocks2.png');
    game.load.image('Untitled-1', '/public/assets/Untitled-1.png');
    game.load.audio('star-dude-theme', '/public/assets/star-dude-theme.mp3');
  },

  create: function() {
    game.state.start('menu');
  }
};
