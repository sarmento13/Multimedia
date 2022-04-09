import {CST} from "../js/CST.js"

export class PauseScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PAUSE
        })
    }
    init(data){
        /*pause previous scene*/
        this.previousScene = data.key;
    }
    create(){
        /*black background*//*black background*/
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "black").setDepth(3).setAlpha(0.7);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2.35, "gradient").setDepth(4);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.3, "pause").setDepth(5);
        /*buttons*/
        let btn = [];
        btn[0] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 30, "continue").setScale(0.5).setDepth(5);
        btn[1] = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2.5 + 60,"restart").setScale(0.5).setDepth(5);
        btn[2] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 90, "back").setScale(0.5).setDepth(5);
        console.log("PAUSED!");
        /*set interactivity*/
        for(let i = 0; i < 3; i++){
            btn[i].setInteractive();

            btn[i].on("pointerover", ()=>{
                btn[i].setScale(0.6);
            });

            btn[i].on("pointerout", ()=>{
                btn[i].setScale(0.5);
            });

            btn[i].on("pointerup", ()=>{
                switch (i) {
                    case 0:
                        this.scene.resume(this.previousScene);
                        this.scene.stop(CST.SCENES.PAUSE);
                        break;
                    case 1:
                        this.sound.removeByKey("levelTheme");
                        this.scene.stop(this.previousScene);
                        this.scene.start(this.previousScene);
                        break;
                    case 2:
                        this.sound.removeByKey("levelTheme");
                        this.scene.stop(this.previousScene);
                        this.scene.start(CST.SCENES.MENU);
                        break;
                }
            });
        }
    }
}