import { bus } from "../bus.js";
import { ObjectSelected } from "./ncje-object-picker.js";
import { imgUrlBase } from "./urls.js";

class Board extends HTMLElement {

    #send;
    #selectedObject;

    constructor() {
        super();
        this.render();
        this.#send = bus(this);
        this.addEventListener("click", e => this.handleClick(e));
    }

    render() {
        this.innerHTML = `<div class="square"></div>`.repeat(9);
    }

    receive({ type, payload }) {

        console.log(type, ObjectSelected, payload, type === ObjectSelected);
        if (type === ObjectSelected) {
            this.#selectedObject = payload;
        }

    }

    handleClick(e) {

        if(!this.#selectedObject) return;

        let target = e.target;
        if(!target.classList.contains("square")) target = target.closest(".square");
        if(!target.classList.contains("square")) return;

        target.innerHTML = 
            `<img src="${imgUrlBase.href}/${this.#selectedObject}.svg"></img>`;

    }

}

customElements.define("ncje-board", Board);