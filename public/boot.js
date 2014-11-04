'use strict';

var bootState = {

  create: function() { 
    game.stage.backgroundColor = '#34df33';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start('load');
  }

};
