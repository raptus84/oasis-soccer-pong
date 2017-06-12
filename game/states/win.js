class Win extends Phaser.State {
    create () {
        this.game.add.tileSprite(0, 0, 800, 600, 'win');

        game.input.onDown.addOnce(this.restart, this);
    }

    restart () {
        this.game.state.start('menu');
    }
}
