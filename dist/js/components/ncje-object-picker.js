class ObjectPicker extends HTMLElement {

    constructor() {
        super();
        this.render();
    }

    renderPickerOption(name) {
        return `
            <label>
                <span>${name}</span>
                <input type="radio" name="object" value="${name.toLowerCase()}" />
            </label>
        `;
    }

    render() {
        this.innerHTML = ["Bomb", "Cross-barrier", "Nought-barrier", "Cross", "Nought"]
            .map(this.renderPickerOption.bind(this))
            .join("");
    }

}

customElements.define("ncje-object-picker", ObjectPicker);