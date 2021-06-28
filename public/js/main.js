      //different levels, which means multiple scenes

    //timer
    //keep track of score

    //maybe an enemy


    let player;
    let stars;
    let bombs;
    let platforms;
    let cursors;
    let score = 0;
    let gameOver = false;
    let scoreText;


    let levelText;
    let level = 1;

    let backgrounds;
    let currentBG;
    
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics:{
            default:"arcade",
            arcade:{
                debug:false
            }
        },
        scene: [Scene1,Scene2,Scene3]
        
    };

    var game = new Phaser.Game(config);

   
    function chooseLevel(){
        let levelList = [
            [[600,400],[50,250],[750,220],[750,520]],
            [[600,400],[50,250],[750,220],[100,400]],
            [[-100,105],[400,320],[720,520]],
            [[400,320],[720,520]],
            [[600,400],[50,230],[750,220],[100,400],[-100,105],[720,520]],
            [[600,400],[50,250]],
            [[600,400],[600,200]],
            [[50,250],[60,100],[50,400]]
        ]
        const random = Math.floor(Math.random() * levelList.length);
        console.log(levelList[random]);
        return levelList[random];
    }