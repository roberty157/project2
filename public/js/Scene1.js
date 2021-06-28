class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image('sky2', './assets/sky2.jpg');
        this.load.image('playButton', './assets/play.png');
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
    this.add.image(400, 300, 'sky2');

    const playButton = this.add.image(400,300,'playButton')
        .setScale(2)
        .setInteractive()
        .on('pointerdown', () =>  this.scene.start("playGame"));
    
        /*
    const clickButton = this.add.text(100, 100, 'start game!', { fill: '#0f0' })
      .setInteractive()
      */
      /*
      this.anims.create({
        key: "beam_anim",
        frames: this.anims.generateFrameNumbers("beam"),
        frameRate: 20,
        repeat: -1
      });
      */
  }
}

//export default bootGame;