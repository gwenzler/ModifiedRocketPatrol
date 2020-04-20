/* Giovanni Wenzler Modified Rocket Patrol
    Points Breakdown:
    -high score that persists through games: 10 pts
    -display of remaining time: 15 pts
    -smaller, faster ship w/new graphics and worth more: 25 pts
    -new scrolling backgroung graphic: 10 pts
    -parallax scrolling: 15 pts

*/
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