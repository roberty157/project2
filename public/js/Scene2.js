

class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame")
    }
    
    preload ()
    {
        this.load.image('sky', './assets/sky.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('star', './assets/star.png');
        this.load.image('bomb', './assets/bomb.png');
        this.load.spritesheet('OurSprite', './assets/OurSprite.png', { frameWidth: 100, frameHeight: 138 });

    // Creating 5 different background images
        bg1 = this.load.image('sky', './assets/sky.png');
        bg2 = this.load.image('sky2', './assets/sky2.png');
        bg3 = this.load.image('sky3', './assets/sky3.png');
        bg4 = this.load.image('sky4', './assets/sky4.png');
        bg5 = this.load.image('sky5', './assets/sky5.png');

    //   Added images to array
        const backgrounds = [bg1, bg2, bg3, bg4, bg5];
    }

    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        //[600,400], [50,250], [750,220]
        platforms.create(600, 400, 'ground');
        platforms.create(600, 200, 'ground');

        platforms.create(50, 250, 'ground');
        //platforms.create(70, 100, 'ground');
        //platforms.create(50, 400, 'ground');
        //platforms.create(750, 220, 'ground');
        //platforms.create(100, 400, 'ground');
        //platforms.create(-100, 105, 'ground');
        //platforms.create(400,320, 'ground');
        //platforms.create(720, 520, 'ground');
        //console.log(platform1.x = 700);
        //console.log(Object.entries(platforms));
        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'OurSprite');

        
        player.setScale(.4);
        player.setGravityY(250);

        player.body.useDamping=true;
        player.setDrag(0.95,0);

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
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
/*
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
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {
            child.setGravityY(100);

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        levelText = this.add.text(590,16, 'Level: 1', { fontSize: '32px', fill: '#000' });
        // the level
        //levelText = this.add.text(16,16,'Level:', {fontSize: '32px',fill:'#000'});

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
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

    collectStar (player, star)
    {
        /*
        for(let i = 0;i < 3;i++){
            console.log(i);
            platforms.remove(platforms.children.entries[1],true);
        }
        */

        
        //console.log(platforms);
        //platforms.remove(platforms.children.entries[1],true);
        //platforms.create(100, 400, 'ground');
        //console.log(platforms.children.entries[1]);
        //platforms.children.entries[1].destroy();
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            console.log('all stars collected');
            //console.log(platforms);
            //platform1.x = 200;
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setGravityY(100);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            //this.scene.start("playGame");
            //remove all platforms
            level++;
            levelText.setText('Level: ' + level);
            for(let i = 0;i < 3;i++){
                console.log(i);
                platforms.remove(platforms.children.entries[1],true);
            }
            let coords = chooseLevel();
            for(let i=0;i<coords.length;i++){
                platforms.create(coords[i][0], coords[i][1], 'ground');
            }
            // Function to randomly select background from array created in scene1
            const randomBG = Math.floor(Math.random() * backgrounds.length);
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




