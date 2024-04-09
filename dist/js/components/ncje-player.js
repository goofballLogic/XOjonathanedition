class Player extends HTMLElement {

    #player;

    constructor() {
        super();
        this.#player = "Crosses";
        this.render();
    }

    render() {
        this.innerHTML = `Player: ${this.#player}`;
    }

}

customElements.define("ncje-player", Player);