let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

game.settings = {
    spaceshipSpeed: 3,
    ufoSpeed: 4,
    gameTimer: 60000,
    highScore: 0
}
//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;