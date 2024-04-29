import { bus } from "../bus.js";
import { ObjectPlaced } from "./ncje-board.js";
import { PlayerWins } from "./ncje-winner.js";

export const CROSSES = "Crosses";
export const NOUGHTS = "Noughts";

export const PlayerReady = Symbol("Player ready");

class Player extends HTMLElement {

    #player;
    #send;
    #playerWins;

    constructor() {
        super();
        this.#send = bus(this);
        setTimeout(() => {
            this.changePlayer();
            this.render();
        });
    }

    render() {
        this.innerHTML = this.#playerWins ? "GAME OVER" : `Player: ${this.#player}`;
    }

    receive({ type, payload }) {

        if (type === ObjectPlaced) {

            this.changePlayer();
            this.render();

        } else if (type === PlayerWins) {

            this.#playerWins = true;
            this.render();

        }

    }

    changePlayer() {

        console.log("Change player");
        this.#player = this.#player === CROSSES ? NOUGHTS : CROSSES;
        this.#send({ type: PlayerReady, payload: this.#player });

    }

}

customElements.define("ncje-player", Player);
