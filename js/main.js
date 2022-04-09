import '../lib/phaser.js'
import MatterCollisionPlugin from '../lib/phaser-matter-collision-plugin.js'
import {LoadScene} from "../scenes/LoadScene.js";

export var game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 832,
    height: 640,
    physics: {
        default: 'matter',
        arcade:{
            gravity: {y: 0.5},
            debug: true
        }
    },
    plugins: {
        scene: [
            {
                plugin: MatterCollisionPlugin, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    },
    scene:[LoadScene]
});

export default MatterCollisionPlugin;