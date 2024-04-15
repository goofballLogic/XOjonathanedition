import { bus } from "../bus.js";
import { ObjectPlaced } from "./ncje-board.js";

export const CROSSES = "Crosses";
export const NOUGHTS = "Noughts";

class Player extends HTMLElement {

    #player;
    #send;

    constructor() {
        super();
        this.#player = "Crosses";
        this.render();
        this.#send = bus(this);
    }

    render() {
        this.innerHTML = `Player: ${this.#player}`;
    }

    receive({ type, payload }) {

        if (type === ObjectPlaced) {

            this.#player = this.#player === CROSSES ? NOUGHTS : CROSSES;
            this.render();

        }

    }

}

customElements.define("ncje-player", Player);
