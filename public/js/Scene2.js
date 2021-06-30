

class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame")
    }
    
    preload ()
    {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platformDarkGray.png');
        this.load.image('watermelon', './assets/watermelon.png');
        this.load.image('bomb', './assets/bomb.png');
        //Dividing the sprite sheet into the correct pixels to get the correct frame size.
        this.load.spritesheet('OurSprite', './assets/OurSprite.png', { frameWidth: 100, frameHeight: 138 });

    // Creating 5 different background images
        this.load.image('sky', './assets/sky.png');
        this.load.image('sky2', './assets/sky2.jpg');
        this.load.image('sky3', './assets/sky3.jpg');
        this.load.image('sky4', './assets/sky4.jpg');
        this.load.image('sky5', './assets/sky5.jpg');

    }

    create ()
    {
        //  A simple background for our game
        
        // Adding array to randomize the backgrounds per level for the game.
        let bgLst = ['sky2','sky3','sky4','sky5'];
            //randomly selecting background from the array to set for each level as it increases.
            const randomBGIndex = Math.floor(Math.random() * bgLst.length);
            this.add.image(400,300,bgLst[randomBGIndex]);
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // Making static platforms for first level
        if(level == 1){
            platforms.create(600, 400, 'ground');
            platforms.create(600, 200, 'ground');

            platforms.create(50, 250, 'ground');
        }
        // Making random platforms for the levels as they increase
        else{
            let coords = chooseLevel();
            for(let i=0;i<coords.length;i++){
                platforms.create(coords[i][0], coords[i][1], 'ground');
            }
        }
        

        // Adding physics to the player.
        player = this.physics.add.sprite(100, 450, 'OurSprite');

        
        player.setScale(.4);
        player.setGravityY(250);

        player.body.useDamping=true;
        player.setDrag(0.95,0);

        //  Giving character a bounce when it hits the ground.
        player.setBounce(0.4);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        //0,2
        //3,5
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('OurSprite', { start: 3, end: 5 }),
            
            frameRate: 10,
            repeat: -1
        });
/*      // Sprite that was chosen does not have a facing you frame, so it will turn from left to right instead of straight on.
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
*/
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('OurSprite', { start: 0, end: 2 }),
            
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

        

        watermelons = this.physics.add.group({
            key: 'watermelon',
            repeat: 11,
            //making random interval that the watermelons will fall in between.
            setXY: { x: 12, y: 0, stepX: Phaser.Math.Between(50,71) }
        });

        watermelons.children.iterate(function (child) {
            child.setGravityY(95);

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.8));

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, `score: ${score}`, { fontSize: '32px', fill: '#FFFFFF' });
        levelText = this.add.text(590,16, `Level: ${level}`, { fontSize: '32px', fill: '#FFFFFF' });
        // the level
        //levelText = this.add.text(16,16,'Level:', {fontSize: '32px',fill:'#000'});

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(watermelons, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, watermelons, this.collectWatermelon, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        console.log(this.scene);


        //create bombs level number minus 1
        for(let i=1;i<level;i++){
            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            let bomb = bombs.create(x, 16, 'bomb');
            bomb.setGravityY(100);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
        


    }
    //Setting interval for the watermelons to be separated by.
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    update ()
    {
        //console.log(platforms);
        if (gameOver)
        {
            this.scene.start("endGame");
            //return;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        /*
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }
        */
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }

    collectWatermelon (player, watermelon)
    {
        /*
        for(let i = 0;i < 3;i++){
            console.log(i);
            platforms.remove(platforms.children.entries[1],true);
        }
        platforms.create(100, 400, 'ground');
        console.log(platforms.children.entries[1]);
        platforms.children.entries[1].destroy();
        */
        watermelon.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);

        if (watermelons.countActive(true) === 0)
        {
            console.log('all watermelons collected');
            //console.log(platforms);
            //platform1.x = 200;
            //  A new batch of stars to collect
            /*
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });
            */
            /*
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setGravityY(100);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            */
            //this.scene.start("playGame");
            //remove all platforms
            level++;
            levelText.setText('Level: ' + level);
            for(let i = 0;i < 3;i++){
                console.log(i);
                platforms.remove(platforms.children.entries[1],true);
            }
            /*
            let coords = chooseLevel();
            for(let i=0;i<coords.length;i++){
                platforms.create(coords[i][0], coords[i][1], 'ground');
            }
            */
            // Function to randomly select background from array created in scene1
            //const randomBGIndex = Math.floor(Math.random() * backgrounds.length);
            //currentBG.texture = backgrounds[1]; 
            //currentBG.destroy();
            //this.add.image(400,300,backgrounds[1]);
            //this.load.image('sky2');
            //new Image(this,400,300,'sky2');
            //console.log(currentBG);   
            //this.add.image(400, 300, 'sky2');
            //currentBG.destroy();
            //currentBG.
            //this.add.image(400, 300, 'sky2');
            this.scene.start("playGame");
        }
    }

    hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
   
    


}





