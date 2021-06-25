class Scene3 extends Phaser.Scene {
    constructor() {
        super("endGame");
    }

    preload(){
        this.load.image('sky', './assets/sky.png');
        //this.load.image('playButton', 'assets/play.png');
        /*
        this.load.spritesheet('beam','../assets/beam.png',{
          frameWidth:16,
          frameHeight:16
      });
      */
    }
  create() {
    //let clickCount = 0;
    //this.clickCountText = this.add.text(100, 200, '');
    this.add.image(400, 300, 'sky');
    this.add.text(200,100,'GAME OVER', { fontSize: '32px', fill: '#000' });
    this.add.text(200, 140, `YOUR SCORE: ${score}`, { fontSize: '32px', fill: '#000' });


  }
}