
var state = {
    ball: {},

    preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#c0c6d1';
        game.load.image('ball', 'assets/ball.png');
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('brick', 'assets/brick.png');
        game.load.spritesheet('ball', 'assets/wobble.png', 20, 20);
        game.load.spritesheet('button', 'assets/button.png', 120, 40);
        scoreText = game.add.text(5, 5, 'Score: 0', { font: '12px Arial', fill: '#000' });
        livesText = game.add.text(game.world.width -55, 5, 'Lives: 3', { font: '12px Arial', fill: '#000' });
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(this.ball, Phaser.Physics.ARCADE);

        this.ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
        this.ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
        this.ball.anchor.set(0.5); 
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.set(1);
        this.ball.checkWorldBounds = true;
    },
    update: function() {
        // State Update Logic goes here.
    }
};

var game = new Phaser.Game(
    480,
    320,
    Phaser.AUTO,
    null,
    state
);