import { bus } from "../bus.js";
import { BOMB } from "../game.js";
import { ObjectSelected } from "./ncje-object-picker.js";
import { imgUrlBase } from "./urls.js";

export const ObjectPlaced = Symbol("Object placed");
export const ObjectPlacementConfirmed = Symbol("Object placement confirmed");
export const ObjectPlacementRequested = Symbol("Object placement requested");

class Board extends HTMLElement {

    #send;
    #selectedObject;
    #frozen;

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

            this.updateRenderSquare(payload);
            if (payload.object === BOMB) {

                this.#frozen = true;
                drama(10, () => {

                    this.#frozen = false;
                    if (Array.isArray(payload.additional))
                        for (const additional of payload.additional)
                            this.updateRenderSquare(additional);

                });              

            }
            this.#send({ type: ObjectPlaced, payload });

        }

    }

    updateRenderSquare({ position, object }) {

        const target = this.querySelector(`div:nth-child(${position + 1})`);
        target.innerHTML = object
            ? `<img src="${imgUrlBase.href}/${object}.svg"></img>`
            : "";
        if (object)
            target.dataset.existing = object;
        else
            delete target.dataset.existing;

    }

    handleClick(e) {

        if (this.#frozen) return;
        if (!this.#selectedObject) return;

        let target = e.target;
        if (!target.classList.contains("square")) target = target.closest(".square");
        if (!target) return;
        if (!target.classList.contains("square")) return;
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

function drama(i, continuation) {

    setTimeout(() => {

        document.body.style.backgroundColor = "red";
        setTimeout(() => {

            document.body.style.backgroundColor = "";
            if (i > 0)
                drama(i - 1, continuation);
            else
                continuation();

        }, 50);

    }, 50);
    
}

