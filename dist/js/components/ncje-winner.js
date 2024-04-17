import { bus } from "../bus.js";

export const PlayerWins = Symbol("Player wins");

class Winner extends HTMLElement {

    #winner = "???";

    constructor() {
        super();
        this.render();
        bus(this);
    }

    render() {
        this.innerHTML = `Winner: ${this.#winner}`;
    }

    receive({ type, payload }) {

        if(type === PlayerWins) {

            this.#winner = payload;
            this.render();

        }        

    }

}

customElements.define("ncje-winner", Winner);
