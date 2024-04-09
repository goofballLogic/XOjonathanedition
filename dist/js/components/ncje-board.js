class Board extends HTMLElement {

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `<div></div>`.repeat(9);
    }

}

customElements.define("ncje-board", Board);