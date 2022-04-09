import {CST} from "../js/CST.js"
import {MenuScene} from "../scenes/MenuScene.js";
import {LevelScene1} from "../scenes/LevelScene1.js";
import {LevelScene2} from "../scenes/LevelScene2.js";
import {LevelScene3} from "../scenes/LevelScene3.js";
import {OptionScene} from "../scenes/OptionScene.js";
import {EndLevelScene} from "../scenes/EndLevelScene.js";
import {PauseScene} from "../scenes/PauseScene.js";
import {ContinueScene} from "../scenes/ContinueScene.js";
import {CreditScene} from "../scenes/CreditScene.js";

export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){

    }
    preload(){
        /*load images*/
        this.load.image("title", "../sources/title.png");
        this.load.image("background", "../sources/background.png");
        this.load.image("gradient", "../sources/gradient.png");
        this.load.image("play", "../sources/play.png");
        this.load.image("continue", "../sources/continue.png");
        this.load.image("pause", "../sources/pause.png");
        this.load.image("options", "../sources/options.png");
        this.load.image("ranking", "../sources/ranking.png");
        this.load.image("quit", "../sources/quit.png");
        this.load.image("black", "../sources/black.png");
        this.load.image("optionsTitle", "../sources/optionsTitle.png");
        this.load.image("portalColor", "../sources/portal_color.png");
        this.load.image("musicOn", "../sources/music_on.png");
        this.load.image("musicOff", "../sources/music_off.png");
        this.load.image("back", "../sources/back.png");
        this.load.image("youwon", "../sources/youwon.png");
        this.load.image("exit_closed", "../sources/DoorLocked.png");
        this.load.image("exit_opening", "../sources/DoorUnlocked.png");
        this.load.image("exit_opened", "../sources/DoorOpen.png");
        this.load.image("sky", "../sources/sky.png");
        this.load.image("btn_on", "../sources/btn_on.png");
        this.load.image("btn_off", "../sources/btn_off.png");
        this.load.image("restart", "../sources/restart.png");
        this.load.image("tileset", "../sources/tileset.png");
        this.load.image("padlock", "../sources/padlock.png");
        this.load.image("1", "../sources/1.png");
        this.load.image("2", "../sources/2.png");
        this.load.image("3", "../sources/3.png");
        this.load.image("continueTitle", "../sources/continueTitle.png");
        this.load.image("tutorial", "../sources/tutorial.png");
        this.load.image("game", "../sources/game.png");
        /*load audio*/
        this.load.audio("mainTheme", "../sources/title_theme.mp3");
        this.load.audio("levelTheme", "../sources/level_back_music.wav");
        this.load.audio("hoverSound", "../sources/move.wav");
        this.load.audio("portalSound", "../sources/portalSound.mp3");
        /*atlas*/
        this.load.atlas("player", "../sources/characterMoves.png", "../sources/characterMoves.json");
        this.load.atlas("bullet", "../sources/bullet.png", "../sources/bullet.json");
        this.load.atlas("portal", "../sources/portal.png", "../sources/portal.json");
        /*load text*/
        this.load.text("log", "../sources/log.txt");
        /*loading bar*/
        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        });

        this.load.on("progress", (percent) =>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent)
        });

        this.load.on("complete",() => {

        });
    }
    create(){
        /*get status*/
        CST.STATUS = this.cache.text.get('log');
        console.log(CST.STATUS);
        /*add scenes dynamically*/
        this.scene.add(CST.SCENES.MENU, MenuScene, false);
        this.scene.add(CST.SCENES.OPTIONS, OptionScene, false);
        this.scene.add(CST.SCENES.CONTINUE, ContinueScene, false);
        this.scene.add(CST.SCENES.LEVEL1, LevelScene1, false);
        this.scene.add(CST.SCENES.LEVEL2, LevelScene2, false);
        this.scene.add(CST.SCENES.LEVEL3, LevelScene3, false);
        this.scene.add(CST.SCENES.LEVEL_END, EndLevelScene, false);
        this.scene.add(CST.SCENES.PAUSE, PauseScene, false);
        this.scene.add(CST.SCENES.CREDIT, CreditScene, false);
        /*start scenes dynamically*/
        this.scene.start(CST.SCENES.MENU);
    }
}