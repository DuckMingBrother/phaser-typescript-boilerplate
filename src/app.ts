import 'p2';
import 'pixi';
// tslint:disable-next-line:ordered-imports
import 'phaser';

import { CANVAS, Game, State } from 'phaser-ce';

window.onload = () => {
    const game = new Game(640, 480, CANVAS, 'game');

    class PhaserGame extends State {
        init() {

        }

        preload() {

        }

        create() {

        }

        update() {

        }
    }

    game.state.add('Game', PhaserGame, true);
};
