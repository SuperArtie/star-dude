'use strict';

var loadState = {

  preload: function () {
    game.load.image('star', 'star-dude.png');
    game.load.image('exit', 'exit.png');
    game.load.image('throwing-star', 'star.png');
    game.load.image('knife', 'knife.png');
    game.load.image('ground', 'platform.png');
    game.load.image('knife-guy', 'knife-guy.png');
    game.load.image('knife-guy2', 'knife-guy2.png');
    game.load.image('star-blood', 'star-blood.png');
    game.load.image('knife-blood', 'knife-blood.png');
    game.load.tilemap('level1', 'level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', 'level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('blocks', 'blocks.png');
    game.load.image('blocks2', 'blocks2.png');
    game.load.image('Untitled-1', 'Untitled-1.png');
    game.load.audio('star-dude-theme', 'star-dude-theme.mp3');
  },

  create: function() { 
    game.state.start('menu');
  }
};
