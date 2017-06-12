

class Play extends Phaser.State {
    create () {

        // define game objects
        this.paddle_one = null;
              this.paddle_one2 = null;
                    this.paddle_oneB = null;
        this.paddle_two = null;
          this.paddle_twoB = null;
        this.ball = null;
        this.emitter = null;
        this.bgGraphics = null;


        // paddles
        this.paddle_one = new Paddle(this.game, 0, this.game.world.centerY, false, false);
      //  this.paddle_one2 = new Paddle(this.game, this.game.world.centerX +50,   this.game.world.width-16, false, false);

        this.paddle_oneB = new Paddle(this.game, this.game.world.centerX +100, this.game.world.centerY, false, false);


        this.paddle_two = new Paddle(this.game, this.game.world.width - 16, this.game.world.centerY, true, true);

        this.paddle_twoB = new Paddle(this.game, this.game.world.width - 500, this.game.world.centerY, true, true);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // ball
        this.ball = new Ball(this.game, this.game.world.centerX, this.game.world.centerY, false);
        game.input.onDown.addOnce(this.ball.launch(), this);


        // bg color
        game.stage.backgroundColor = "#292953";

        // particles emitter
        this.particleEmitter();

        // screen text stuff
        this.scoreText();
        this.startText();

        // draw middle dotted line
        this.drawLine();


        if(keyboard.isDown(Phaser.Keyboard.ENTER)){
          this.removeStarText();
        }

        game.input.onDown.addOnce(this.removeStarText(), this);

        //this.paddle_two.velocity.setTo(this.ball.body.velocity.y);


    }

    controlPaddle(paddle_one,paddle_oneB,y){

    }

    update () {



        this.game.physics.arcade.collide(this.paddle_one, this.ball, function(){  game.sound.play('hit1');});
        this.game.physics.arcade.collide(this.paddle_one2, this.ball,function(){  game.sound.play('hit1');});
        this.game.physics.arcade.collide(this.paddle_two, this.ball,function(){  game.sound.play('hit1');});


/*
        if (keyboard.isDown(Phaser.Keyboard.UP)) {
                  this.paddle_one.body.velocity.y = -6000;
                    this.paddle_oneB.body.velocity.y = -6000;
              } else if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
                  this.paddle_one.body.velocity.y = 600;
                  this.paddle_oneB.body.velocity.y = 600;
              } else {
                    this.paddle_one.body.velocity.y = 0;
                   this.paddle_oneB.body.velocity.y = 0;
              }
              if (this.paddle_one.body.y < 22) {
                this.paddle_one.body.y = 22;
              }
              if (this.paddle_oneB.body.y < 22) {
                this.paddle_oneB.body.y = 22;
              }
              */

        if(this.ball.body.deltaX()<0){

          this.game.physics.arcade.collide(this.paddle_oneB, this.ball, function(){  game.sound.play('hit1');});
        }


  if(this.ball.body.deltaX()>0){
        this.game.physics.arcade.collide(this.paddle_twoB, this.ball, function(){  game.sound.play('hit1');});
  }
        this.paddle_two.body.velocity.setTo(this.ball.body.velocity.y-20);

        this.paddle_twoB.body.velocity.setTo(this.ball.body.velocity.y-40);

        this.paddle_two.body.velocity.x =0;
        this.paddle_twoB.body.velocity.x =0;

        if (this.ball.body.touching.left) {
            this.game.sound.play('bounce');
            this.emitter.x = this.ball.x;
            this.emitter.y = this.ball.y;
            this.emitter.start(true, 2000, null, 20);
            this.game.camera.shake(0.000005, 200);
        } else if (this.ball.body.touching.right) {
            this.emitter.x = this.ball.x;
            this.emitter.y = this.ball.y;
            this.emitter.start(true, 2000, null, 20);
            this.game.sound.play('bounce');
            this.game.camera.shake(0.000005, 200);
        }

        if (this.ball.body.blocked.right) {
            this.paddle_one.score += 1;
            this.score_one.setText(`Score: ${this.paddle_one.score}`);
            this.game.sound.play('bounce');
            this.game.camera.shake(0.005, 1000);
        } else if (this.ball.body.blocked.left) {
            this.paddle_two.score += 1;
            this.score_two.setText(`Score: ${this.paddle_two.score}`);
            this.game.sound.play('bounce');
            this.game.camera.shake(0.005, 1000);
        }

        if (this.paddle_one.score >= 5) {
            this.game.state.start('win');
        } else if (this.paddle_two.score >= 5) {
            this.game.state.start('lose');
        }
    }

    removeStarText () {
        return function () {
            this.start_text.destroy();
        }
    }

    scoreText () {
        this.score_one = this.game.add.text(
            32, 32,
            `Score: ${this.paddle_one.score}`,
            { font: '20px Courier', fill: '#FFF' }
        );

        this.score_two = this.game.add.text(
            800-132, 32,
            `Score: ${this.paddle_two.score}`,
            { font: '20px Courier', fill: '#FFF' }
        );
    }

    startText() {
        this.start_text = this.game.add.text(
            this.game.world.centerX-160, this.game.world.centerY-22,
            `Click to Start`,
            { font: '40px Courier', fill: '#FFF' }
        );
    }

    drawLine () {
        this.bgGraphics = game.add.graphics(0, 0);
        this.bgGraphics.lineStyle(2, 0xFFFFFF, 1);

        for (var y = 0; y < this.game.world.height; y += 5 * 2) {
            this.bgGraphics.moveTo(this.game.world.centerX, y);
            this.bgGraphics.lineTo(this.game.world.centerX, y + 5);
        }
    }

    particleEmitter () {

        this.emitter = game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('particle');
        this.emitter.gravity = 200;
    }
}
