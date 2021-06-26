class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image('sky', './assets/sky.png');
        this.load.image('playButton', './assets/play.png');
        /*
        this.load.spritesheet('beam','../assets/beam.png',{
          frameWidth:16,
          frameHeight:16
      });
      */
     bg1 = this.load.image('sky', './assets/sky.png');
     bg2 = this.load.image('sky2', './assets/sky2.png');
     bg3 = this.load.image('sky3', './assets/sky3.png');
     bg4 = this.load.image('sky4', './assets/sky4.png');
     bg5 = this.load.image('sky5', './assets/sky5.png');

     const backgrounds = [bg1, bg2, bg3, bg4, bg5];

     const randomBG = Math.floor(Math.random() * backgrounds.length);
    }
  create() {
    //let clickCount = 0;
    //this.clickCountText = this.add.text(100, 200, '');
    this.add.image(400, 300, 'sky');

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