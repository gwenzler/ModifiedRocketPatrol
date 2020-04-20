class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('ufo','./assets/ufo.png');
        this.load.image('starfield','./assets/starfield.png');
        this.load.image('planet1','./assets/planet1.png');
        this.load.image('planet2','./assets/planet2.png');
        this.load.image('mountains','./assets/mountains.png');
        this.load.image('asteroid','./assets/asteroid.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('boom', './assets/boom.png', {frameWidth: 44, frameHeight: 19, startFrame: 0, endFrame: 5});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.planet1 = this.add.tileSprite(0, 0, 640, 480, 'planet1').setOrigin(0,0);
        this.planet2 = this.add.tileSprite(0, 0, 640, 480, 'planet2').setOrigin(0,0);
        this.mountain = this.add.tileSprite(0, 0, 640, 480, 'mountains').setOrigin(0,0);
        this.asteroid = this.add.tileSprite(0, 0, 640, 480, 'asteroid').setOrigin(0,0);
         // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 196, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 260, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 332, 'spaceship', 0, 10).setOrigin(0,0);
        this.ufo = new Ufo(this,game.config.width - 78, 132, 'ufo', 0, 50).setOrigin(0,0);
        
        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setOrigin(0, 0);

       
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'kaboom',
            frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;


        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //highscore display
        let highConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.highLeft = this.add.text(224, 54, game.settings.highScore, highConfig);

        

        // game over flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu',scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        // clock display
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.timeRight = this.add.text(420, 54, this.game.settings.gameTimer, clockConfig);
    }
    
    update() {
        if(this.gameOver && this.p1Score>this.game.settings.highScore){
            this.game.settings.highScore = this.p1Score;
            
        }
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
            
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        // timer
        this.timeRight.text = this.game.settings.gameTimer/1000 - Math.floor(this.clock.elapsed/1000);
        

        this.starfield.tilePositionX -= 4;
        this.planet1.tilePositionX -= 4.3;
        this.planet2.tilePositionX -= 4.8;
        this.mountain.tilePositionX -= 5.7;
        this.asteroid.tilePositionX -= 6.5;
        
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ufo.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ufo)) {
            this.p1Rocket.reset();
            this.ufoExplode(this.ufo);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    ufoExplode(ship) {
        ship.alpha = 0;         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'boom').setOrigin(0, 0);
        boom.anims.play('kaboom');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}
