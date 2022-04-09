import {CST} from "../js/CST.js"

export class EndLevelScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LEVEL_END
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
        let hover = this.add.image(this.game.renderer.width / 2, this.game.renderer.height /2, "black").setDepth(0);

        let title = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.3, "youwon").setScale(0.7).setDepth(1);
        /*buttons*/
        let btn = [];
        btn[0] = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2.5 + 30, "continue").setScale(0.5).setDepth(1);

        /*set interactivity*/
        for(let i = 0; i < 1; i++){
            btn[i].setInteractive();

            btn[i].on("pointerover", ()=>{
                btn[i].setScale(0.6);
            });

            btn[i].on("pointerout", ()=>{
                btn[i].setScale(0.5);
            });

            btn[i].on("pointerup", ()=>{
                console.log("UP");
                switch (i) {
                    case 0:
                        this.scene.start(this.data);//supposedly will start level 2
                        break;
                }
            });
        }
        
    }
}