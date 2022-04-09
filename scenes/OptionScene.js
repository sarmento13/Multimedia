import {CST} from "../js/CST.js"

export class OptionScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.OPTIONS
        })
    }
    init(data){
        /*pause previous scene*/
        this.data = data;
        this.scene.pause(data);
    }
    preload(){
        /*load images and sound*/
    }
    create(){
        /*black background*/
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "black").setDepth(-1).setAlpha(0.7);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2.35, "gradient").setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.3, "optionsTitle").setScale(0.7).setDepth(2);
        /*buttons*/
        let btn = [];
        btn[0] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 30, "portalColor").setScale(0.5).setDepth(1);

        if(this.sound.mute){btn[1] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 60, "musicOff").setScale(0.5).setDepth(1);}
        else{btn[1] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 60, "musicOn").setScale(0.5).setDepth(1);}

        btn[2] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 90, "back").setScale(0.5);
        /*set interactivity*/
        for(let i = 0; i < 3; i++) {
            btn[i].setInteractive();

            btn[i].on("pointerover", () => {
                btn[i].setScale(0.6);
            });

            btn[i].on("pointerout", () => {
                btn[i].setScale(0.5);
            });

            btn[i].on("pointerup", () => {
                switch (i) {
                    case 0:

                        break;
                    case 1:
                        if (this.sound.mute) {
                            this.sound.mute = false;
                            btn[1].setTexture("musicOn");
                            break;
                        }
                        this.sound.mute = true;
                        btn[1].setTexture("musicOff");
                        break;
                    case 2:

                        this.scene.resume(CST.SCENES.MENU);
                        this.scene.stop(CST.SCENES.OPTIONS);
                        break;
                }
            });
        }
    }
}