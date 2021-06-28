

class Scene3 extends Phaser.Scene {
    constructor() {
        super("endGame");
    }

    preload(){
        this.load.image('sky2', './assets/sky2.jpg');
        this.load.image('exit', './assets/exit.png');
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
    this.add.image(400, 300, 'sky2');
    
    this.add.text(200,100,'GAME OVER', { fontSize: '32px', fill: '#FFFFFF' });
    this.add.text(200, 140, `YOUR SCORE: ${score}`, { fontSize: '32px', fill: '#FFFFFF' });

    
    

    const response = fetch('/api/highscore',{
      method: 'POST',
      body: JSON.stringify({score}),
      headers: {'Content-Type':'application/json'},
    }).then(
      value=>{
        console.log(value);
        fetch('/api/highscore/topten')
      .then(response=>response.json())
      .then(data => 
        {console.log(data)
          this.add.text(240, 180, `Leaderboard`, { fontSize: '32px', fill: '#FFFFFF' });
          for(let i=0;i<data.length;i++){
            this.add.text(200,220+(i*20),`${i+1}.  ${data[i].score}         ${data[i].user.name}`, {fontSize:'16px', fill: '#FFFFFF'});
          }
        });
      }
    )
    
    const exitButton = this.add.image(400,500,'exit')
    .setScale(2)
    .setInteractive()
    .on('pointerdown', () =>  this.scene.start("bootGame"));


    
      
    

      
    
    

    
    

  }
}

//export default endGame;