class Menu extends Phaser.State {
    create () {
        this.game.stage.smoothed = false;




        this.game.add.tileSprite(0, 0, 800, 600, 'menu_bg');

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      // spaceKey.onDown.addOnce(this.start, this);



        game.input.onDown.addOnce(this.start, this);
    }

    start () {
        this.game.state.start('play');
    }
}
