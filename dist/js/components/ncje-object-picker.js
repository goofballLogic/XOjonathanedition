const imgUrlBase = new URL(import.meta.url);
const pathBits = imgUrlBase.pathname.split("/");
pathBits.pop();
pathBits.pop();
pathBits.pop();
pathBits.push("img");
imgUrlBase.pathname = pathBits.join("/");
console.log(imgUrlBase);

class ObjectPicker extends HTMLElement {

    constructor() {
        super();
        this.render();
    }

    renderPickerOption(name) {
        return `
            <label>
                <object data="${imgUrlBase.href}/${name}.svg"></object>
                <input type="radio" name="object" value="${name.toLowerCase()}" />
            </label>
        `;
    }

    render() {
        this.innerHTML = ["dynamite", "Cross-barrier", "Nought-barrier", "Cross", "Nought"]
            .map(this.renderPickerOption.bind(this))
            .join("");
    }

}

customElements.define("ncje-object-picker", ObjectPicker);