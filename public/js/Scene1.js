class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    //preloading background and play button
    preload(){
        this.load.image('sky2', './assets/sky2.jpg');
        this.load.image('playButton', './assets/play.png');
       
    }
  create() {
    //preloading the sky2 image so that the first level is the same background for every player.
    this.add.image(400, 300, 'sky2');

    //when clicked loads main game scene
    const playButton = this.add.image(400,300,'playButton')
        .setScale(2)
        .setInteractive()
        .on('pointerdown', () =>  this.scene.start("playGame"));
    
      
  }
}

