import {CST} from "../js/CST.js"
import {game} from "../js/main.js"
import Player from "../js/player.js";

export class LevelScene3 extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LEVEL3
        })
    }
    preload(){
        this.load.image("sky", "../sources/sky.png");
        this.load.tilemapTiledJSON("level4", "../sources/Level4Tilemap.json");
    }
    create(){
        this.sound.pauseOnBlur = false;
        this.sound.play("levelTheme", {loop: true, volume: 0.5});
        /*background*/
        this.add.image(0, 0, 'sky').setOrigin(0, 0).setDepth(0);
        this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
        /*load tilemap and tileset*/
        this.importTileMap();
        /*set camera and boundies*/
        this.setView();
        /*add objects*/
        this.addObjects();
        /*add collides*/
        this.addColliders();
        /*add pause label*/
        this.addPauseLabel();
    }
    addPauseLabel(){
        /*Get screen size*/
        const width = this.game.config.width;
        const height = this.game.config.height;
        /*Add text button to pause and click event*/
        this.add.text(width - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => this.pausedClicked(width, height) );

    }
    /*Pause events*/
    pausedClicked(){
        console.log("Clicked!");
        this.scene.launch(CST.SCENES.PAUSE, this.scene);
        this.scene.pause(this.scene.key);
    }
    /*import tile map and create layers*/
    importTileMap(){
        this.map = this.make.tilemap({key: "level4"});
        const tileset = this.map.addTilesetImage("tileset", "tileset");
        /*get layers*/
        this.groundLayer = this.map.createDynamicLayer("ground", tileset, 0, 0);
        this.ceilingLayer = this.map.createDynamicLayer("ceiling", tileset, 0, 0);
        this.wall = this.map.createDynamicLayer("wall", tileset, 0, 0);

        this.groundLayer.setCollisionByProperty({ collides: true });
        this.ceilingLayer.setCollisionByProperty({ collides: true });
        this.wall.setCollisionByProperty({ collides: true });

        this.matter.world.convertTilemapLayer(this.groundLayer);
        this.matter.world.convertTilemapLayer(this.ceilingLayer);
        this.matter.world.convertTilemapLayer(this.wall);
    }
    /*set camera and boundaries*/
    setView() {
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }
    /*add objects*/
    addObjects(){
        /*Add final door*/
        let aux = this.map.findObject("Button", obj => obj.name === "Point");
        this.button = this.add.image(aux.x, aux.y, 'btn_off').setDepth(1);
        /*Add button*/
        aux = this.map.findObject("Door", obj => obj.name === "Point");
        this.door = this.add.image(aux.x, aux.y, 'exit_closed').setDepth(1);
        /*add player*/
        aux = this.map.findObject("Spawn", obj => obj.name === "Point");
        this.player = new Player(this, aux.x, aux.y);
        /*add door and create sensor*/
        const rect = this.map.findObject("Door", obj => obj.name === "Sensor");
        this.levelClear = this.matter.add.rectangle(rect.x + rect.width / 2, rect.y + rect.height / 2, rect.width, rect.height,{isSensor: true, isStatic: true});
        /*Add and create button sensor*/
        const rect2 = this.map.findObject("Button", obj => obj.name === "Sensor");
        this.buttonSensor = this.matter.add.rectangle(rect2.x + rect2.width / 2, rect2.y + rect2.height / 2, rect2.width, rect2.height,{isSensor: true, isStatic: true});
    }
    /*add colliders*/
    addColliders(){
        /*Player Collide with Deathly Tiles*/
        this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
            objectA: this.player.sprite,
            callback: this.onPlayerCollide,
            context: this
        });
        /*Player Collide Door Sensor*/
        this.unsubscribeDoorCollide = this.matterCollision.addOnCollideStart({
            objectA: this.player.sprite,
            objectB: this.levelClear,
            callback: this.onLevelClear,
            context: this
        });
        /*Player Collide with Button Sensor*/
        this.unsubscribeButtonCollide= this.matterCollision.addOnCollideStart({
            objectA: this.player.sprite,
            objectB: this.buttonSensor,
            callback: this.onButtonCollide,
            context: this
        });
    }
    onButtonCollide(){
        const button = this.button;
        this.unsubscribeButtonCollide();
        /*Play button on sound*/
        /*Destroy Wall Layer*/
        this.wall.destroy();
        /*Change texture to on*/
        button.setTexture("btn_on");
    }
    onLevelClear() {
        /*door opening animations happens only once*/
        this.unsubscribeDoorCollide();
        this.player.freeze();
        /*change door texture to opening*/
        this.door.setTexture('exit_opening');
        /*delay*/
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                CST.STATUS = '4';
                this.sound.removeByKey("levelTheme");
                /*change door texture to opened*/
                this.cameras.main.fade(250, 0, 0, 0);
                this.door.setTexture('exit_opened');
                /*fade out to next level*/
                this.cameras.main.fade(250, 0, 0, 0);
                this.cameras.main.once("camerafadeoutcomplete", () => this.scene.start(CST.SCENES.LEVEL4));
            },
        });
    }
    onPlayerCollide({ gameObjectB }) {
        if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;

        const tile = gameObjectB;
        if (tile.properties.kills) {
            this.unsubscribePlayerCollide();
            this.player.freeze();
            this.restart();
        }
    }
    restart (){
        const cam = this.cameras.main;
        cam.fade(500, 0, 0, 0);
        cam.shake(250, 0.01);

        this.time.addEvent({
            delay: 500,
            callback: function () {
                this.sound.removeByKey("levelTheme");
                cam.resetFX();
                this.scene.restart();
            },
            callbackScope: this
        });
    }
}