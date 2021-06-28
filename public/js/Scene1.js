class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image('sky2', './assets/sky2.jpg');
        this.load.image('playButton', './assets/play.png');
       
    }
  create() {
    
    this.add.image(400, 300, 'sky2');

    //when clicked loads main game scene
    const playButton = this.add.image(400,300,'playButton')
        .setScale(2)
        .setInteractive()
        .on('pointerdown', () =>  this.scene.start("playGame"));
    
      
  }
}

