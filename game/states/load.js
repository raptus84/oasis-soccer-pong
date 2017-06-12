var SOUND_VOLUME = 0.1;
var keyboard;

  var soundAssets = {
    ballBounceURL: 'assets/ballBounce',
    ballBounceName: 'ballBounce',
    ballHitURL: 'assets/ballHit',
    ballHitName: 'ballHit',
    ballMissedURL: 'assets/ballMissed',
    ballMissedName: 'ballMissed',
    mp4URL: '.m4a',
    oggURL: '.ogg',
  };

  var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
    dashSize: 5,
    paddleLeft_x: 50,
    paddleRight_x: 590,
    paddleVelocity: 600,
    paddleSegmentsMax: 4,
    paddleSegmentHeight: 4,
    paddleSegmentAngle: 15,
    paddleTopGap: 22,
    ballVelocity: 500,
    ballRandomStartingAngleLeft: [-120, 120],
    ballRandomStartingAngleRight: [-60, 60],
    ballStartDelay: 2,
    ballVelocityIncrement: 25,
    ballReturnCount: 4,
    scoreToWin: 11,
  };
  var mainState = function(game) {
    this.backgroundGraphics;
    this.ballSprite;
    this.paddleLeftSprite;
    this.paddleRightSprite;
    this.paddleGroup;
    this.paddleLeft_up;
    this.paddleLeft_down;
    this.paddleRight_up;
    this.paddleRight_down;
    this.missedSide;
    this.scoreLeft;
    this.scoreRight;
    this.tf_scoreLeft;
    this.tf_scoreRight;
    this.sndBallHit;
    this.sndBallBounce;
    this.sndBallMissed;
    this.instructions;
    this.winnerLeft;
    this.winnerRight;
    this.ballVelocity;
  }

class Load extends Phaser.State {



    preload () {

      this.game.load.audio('hit1', [soundAssets.ballHitURL + soundAssets.mp4URL, soundAssets.ballHitURL + soundAssets.oggURL]);
      this.game.load.audio('bounce', [soundAssets.ballBounceURL + soundAssets.mp4URL, soundAssets.ballBounceURL + soundAssets.oggURL]);
  //    this.sndBallHit = game.add.audio(soundAssets.ballHitName, SOUND_VOLUME);

        this.game.load.image('menu_bg', 'assets/bg.bmp');
        this.game.load.image('win', 'assets/win.bmp');
        this.game.load.image('over', 'assets/over.bmp');
        this.game.load.image('paddle', 'assets/paddle.png');
        this.game.load.image('ball', 'assets/ball.png');
        this.game.load.image('particle', 'assets/particle.bmp');
        this.game.add.tileSprite(0, 0, 800, 600, 'loading');

    }

    create () {
        setTimeout(function() {
            this.game.state.start('menu');
              this.keyboard = this.game.input.keyboard;
        }, 1000);
    }
}
