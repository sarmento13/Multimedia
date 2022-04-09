import {CST} from "../js/CST.js"

export class ContinueScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.CONTINUE
        })
    }
    init(){

    }
    preload(){

    }

    create(){
        /*title*/
        this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.05, "continueTitle").setOrigin(0).setScale(0.10).setDepth(1);
        this.add.image(0, 0, "black").setOrigin(0).setDepth(0);
        /*tutorial*/
        this.add.image(this.game.renderer.width * 0.2, this.game.renderer.height * 0.25, "tutorial").setOrigin(0).setScale(0.10).setDepth(1);
        /*tutorial levels*/
        const level1 = this.add.image(this.game.renderer.width * 0.25, this.game.renderer.height * 0.38, "padlock").setOrigin(0).setScale(0.10).setDepth(1);
        const level2 = this.add.image(this.game.renderer.width * 0.40, this.game.renderer.height * 0.38, "padlock").setOrigin(0).setScale(0.10).setDepth(1);
        const level3 = this.add.image(this.game.renderer.width * 0.55, this.game.renderer.height * 0.38, "padlock").setOrigin(0).setScale(0.10).setDepth(1);
        /*game levels*/
        this.add.image(this.game.renderer.width * 0.2, this.game.renderer.height * 0.60, "game").setOrigin(0).setScale(0.10).setDepth(1);
        const level4 = this.add.image(this.game.renderer.width * 0.25, this.game.renderer.height * 0.73, "padlock").setOrigin(0).setScale(0.10).setDepth(1);
        const number = CST.STATUS - "0";
        if(number > 0){
            level1
                .setTexture("1")
                .setInteractive()
                .on("pointerover", ()=>{
                level1.setTint(0x7f8c8d);
                this.sound.play("hoverSound");
            })
                .on("pointerout", ()=>{
                level1.clearTint();
                this.sound.removeByKey("hoverSound");
            })
                .on("pointerup", ()=>{
                this.scene.start(CST.SCENES.LEVEL1);
                });
        }
        if(number > 1){
            level2
                .setTexture("2")
                .setInteractive()
                .on("pointerover", ()=>{
                    level2.setTint(0x7f8c8d);
                    this.sound.play("hoverSound");
                })
                .on("pointerout", ()=>{
                    level2.clearTint();
                    this.sound.removeByKey("hoverSound");
                })
                .on("pointerup", ()=>{
                    this.scene.start(CST.SCENES.LEVEL2);
                });
        }
        if(number > 2){
            level3
                .setTexture("3")
                .setInteractive()
                .on("pointerover", ()=>{
                    level3.setTint(0x7f8c8d);
                    this.sound.play("hoverSound");
                })
                .on("pointerout", ()=>{
                    level3.clearTint();
                    this.sound.removeByKey("hoverSound");
                })
                .on("pointerup", ()=>{
                    this.scene.start(CST.SCENES.LEVEL3);
                });
        }
        if(number > 3){
            level4
                .setTexture("1")
                .setInteractive()
                .on("pointerover", ()=>{
                    level4.setTint(0x7f8c8d);
                    this.sound.play("hoverSound");
                })
                .on("pointerout", ()=>{
                    level4.clearTint();
                    this.sound.removeByKey("hoverSound");
                })
                .on("pointerup", ()=>{
                    this.scene.start(CST.SCENES.LEVEL4);
                });
        }

    }
}
