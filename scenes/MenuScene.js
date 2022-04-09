import {CST} from "../js/CST.js"

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }
    preload(){

    }

    create(){
        /*title*/
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height *0.20, "title").setScale(0.15).setDepth(1);
        /*space background*/
        this.add.image(0, 0, "background").setOrigin(0).setDepth(0);
        /*play music*/
        this.sound.pauseOnBlur = false;
        this.sound.play("mainTheme", {loop: true, volume: 0.5});
        /*buttons*/
        let btn = [];
        btn[0] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5, "play").setScale(0.5).setDepth(1);
        btn[1] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 30, "continue").setScale(0.5).setDepth(1);
        btn[2] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 60, "options").setScale(0.5).setDepth(1);
        btn[3] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 90, "quit").setScale(0.5).setDepth(1);
        /*set interactivity*/
        for(let i = 0; i < 4; i++){
            if(i === 1 && CST.STATUS === "0"){i++;btn[1].setTint(0x7f8c8d);}
            btn[i].setInteractive();

            btn[i].on("pointerover", ()=>{
                btn[i].setScale(0.6);
                this.sound.play("hoverSound");
            });

            btn[i].on("pointerout", ()=>{
                btn[i].setScale(0.5);
                this.sound.removeByKey("hoverSound");
            });

            btn[i].on("pointerup", ()=>{
                switch (i) {
                    case 0:
                        /*load new game*/
                        this.sound.removeByKey("mainTheme");
                        this.scene.start(CST.SCENES.LEVEL1);
                        break;
                    case 1:
                        /*load continue*/
                        this.sound.removeByKey("mainTheme");
                        this.scene.start(CST.SCENES.CONTINUE);
                        break;
                    case 2:
                        /*start in parallel*/
                        this.scene.launch(CST.SCENES.OPTIONS);
                        this.scene.pause(CST.SCENES.MENU);
                        break;
                    case 3  :
                        this.sound.removeByKey("mainTheme");
                        this.scene.start(CST.SCENES.CREDIT);
                        /*quit*/
                        break;
                }
            });
        }
    }
}
