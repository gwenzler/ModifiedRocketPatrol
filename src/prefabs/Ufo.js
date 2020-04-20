class Ufo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene, displayList, updateList
        //store pointValue
        this.points = pointValue;
    }

    update() {
        //move ufo right
        this.x -= game.settings.ufoSpeed;
        // wraparound from right to left edge
        if (this.x <= 0-this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}