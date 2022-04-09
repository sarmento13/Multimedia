import {CST} from "../js/CST.js";

export class CreditScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.CREDIT
        })
    }

    create () {
        const width = this.game.config.width;
        const height = this.game.config.height;
        /*create frames do display*/
        this.frame = [];
        this.frame[1] = this.add.text(width/2, height/2, 'Credits', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setVisible(false);
        this.frame[2] = this.add.text(width/2, height/2, 'Created By: João Teixeira', { fontSize: '26px', fill: '#fff' }).setOrigin(0.5).setVisible(false);
        this.frame[3] = this.add.text(width/2, height/2, 'Created By: Maria Sarmento', { fontSize: '26px', fill: '#fff' }).setOrigin(0.5).setVisible(false);
        this.frame[4] = this.add.text(width/2, height/2,'Created By: Abdellahi Brahim', { fontSize: '26px', fill: '#fff' }).setOrigin(0.5).setVisible(false);
        this.frame[5] = this.add.text(width/2, height/2, 'MULTIMEDIA PROJECT 2019/2020', { fontSize: '26px', fill: '#fff' }).setOrigin(0.5).setVisible(false);
        this.number = 1;
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                if(this.number === 6){
                    this.game.destroy(true);
                }
                if(this.number === 1){
                    this.frame[this.number].setVisible(true);
                }
                else {
                    this.frame[this.number - 1].destroy();
                    this.frame[this.number].setVisible(true);
                }
                this.number++;
            },
            repeat: 5
        })
    }
};