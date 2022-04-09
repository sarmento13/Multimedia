import Portal from "./portal.js";

export default class Projectile {
    constructor(scene, x, y, angle) {
        this.scene = scene;
        this.sprite = scene.matter.add.sprite(x, y, "bullet", "3.png", {isSensor: true});
        this.sprite
            .setIgnoreGravity(true)
            .setRotation(angle)
            .setFixedRotation()
            .setFriction(0, 0)
            .setVelocity(Math.cos(angle)*10, Math.sin(angle)*10);
    }
    destroy(){
        this.sprite.setSensor(false);
        this.sprite.setTexture('bullet', '4.png');
        this.sprite.destroy();
    }
}