import 'p2';
import 'pixi';
// tslint:disable-next-line:ordered-imports
import 'phaser';
import { CANVAS, Game, State } from 'phaser-ce';

const assetKeys = {};
Object.keys(assetKeys).forEach(k => import(`../assets/${k}.png`).then(img => assetKeys[k] = img));

window.onload = () => {
    const game = new Game(640, 480, CANVAS, 'game');

    class PhaserGame extends State {
        init() {

        }

        preload() {
            Object.keys(assetKeys).forEach(k => this.load.image(k, assetKeys[k]));
        }

        create() {

        }

        update() {

        }
    }

    game.state.add('Game', PhaserGame, true);
};
