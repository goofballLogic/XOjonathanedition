import { bus } from "../bus.js";
import { imgUrlBase } from "./urls.js";

export const ObjectSelected = Symbol("Object selected");

class ObjectPicker extends HTMLElement {

    #send;

    constructor() {
        super();
        this.render();
        this.#send = bus(this);
        this.addEventListener("input", e => this.handleClick(e));
    }

    renderPickerOption(name) {
        return `
            <label>
                <img src="${imgUrlBase.href}/${name.toLowerCase()}.svg"></img>
                <input type="radio" name="object" value="${name.toLowerCase()}" />
            </label>
        `;
    }

    render() {
        this.innerHTML = ["dynamite", "Cross-barrier", "Nought-barrier", "Cross", "Nought"]
            .map(this.renderPickerOption.bind(this))
            .join("");
    }

    handleClick(e) {
        const selected = e.target.value;
        this.#send({ type: ObjectSelected, payload: selected });
    }

}

customElements.define("ncje-object-picker", ObjectPicker);