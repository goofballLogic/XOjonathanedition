import { bus } from "../bus.js";
import { ObjectSelected } from "./ncje-object-picker.js";
import { imgUrlBase } from "./urls.js";

export const ObjectPlaced = Symbol("Object placed");
export const ObjectPlacementConfirmed = Symbol("Object placement confirmed");
export const ObjectPlacementRequested = Symbol("Object placement requested");

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

        if (type === ObjectSelected) {
            this.#selectedObject = payload;
        }
        if (type === ObjectPlacementConfirmed) {

            const target = this.querySelector(`div:nth-child(${payload.position+1})`);
            target.innerHTML = `<img src="${imgUrlBase.href}/${payload.object}.svg"></img>`;
            target.dataset.existing = payload.object;
            this.#send({ type: ObjectPlaced, payload });

        }

    }

    handleClick(e) {

        if(!this.#selectedObject) return;
        let target = e.target;
        if(!target.classList.contains("square")) target = target.closest(".square");
        if(!target.classList.contains("square")) return;

        const position = Array.prototype.indexOf.call(target.parentElement.children, target);
        const payload = { 
            position, 
            object: this.#selectedObject,
            existingObject: target.dataset.existing
        };
        this.#send({ type: ObjectPlacementRequested, payload });

    }

}

customElements.define("ncje-board", Board);