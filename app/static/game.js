'use strict';
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('play2', playState2);

game.state.start('boot');
