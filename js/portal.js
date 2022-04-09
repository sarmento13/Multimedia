import Player from "./player.js";

export default class Portal {
    constructor(scene) {
        this.scene = scene;
        this.anims = scene.anims;
        this.state = false;
        this.coordinates = {
            x: 0,
            y: 0,
            orientation: 0
        };
        /*generate frames*/
        var frames = this.anims.generateFrameNames('portal', {
            start: 1, end: 9,
            suffix: '.png'
        });
        /*animation*/
        this.anims.create({
            key: "portal_anim",
            frames: frames,
            frameRate: 10,
            repeat: -1
        });
    }
    trigger(x, y, angle){
        if(this.state)this.close();
        this.open(x, y, angle);
        return this;
    }
    open(x, y, angle){
        this.scene.sound.play("portalSound");
        this.sprite = this.scene.matter.add.sprite(x, y, 'portal', '1.png');
        this.sprite.anims.play("portal_anim", false);
        this.sprite
            .setSensor(true)
            .setIgnoreGravity(true)
            .setScale(0.5)
            .setRotation(angle)
            .setFixedRotation();

        this.coordinates.x = x;
        this.coordinates.y = y;
        this.coordinates.orientation = angle;

        this.state = true;
    }
    close(){
        if(this.state){
            this.coordinates.x = 0;
            this.coordinates.y = 0;
            this.coordinates.orientation = 0;
            this.state = false;
            this.destroy();
        }
    }
    destroy(){
        this.sprite.destroy();
    }
}