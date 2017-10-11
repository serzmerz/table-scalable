class TableComponent extends HTMLElement {
    constructor() {
        super();
        const rows = Number(this.getAttribute("rows"));
        const cols = Number(this.getAttribute("cols"));
        this.rowCount = rows > 0 ? rows : 4;
        this.colCount = cols > 0 ? cols : 4;

        const localDocument = document.currentScript.ownerDocument;
        const tmpl = localDocument.getElementById('tmpl');
        const root = this.createShadowRoot();
        root.appendChild(tmpl.content.cloneNode(true));

        this.rootContainer = root.querySelector('.b-container');
        this.table = root.querySelector('.b-table');

        this.addColumnBtn = this.rootContainer.querySelector('.b-add-column');
        this.removeColumnBtn = this.rootContainer.querySelector('.b-remove-column');
        this.addRowBtn = this.rootContainer.querySelector('.b-add-row');
        this.removeRowBtn = this.rootContainer.querySelector('.b-remove-row');
        this.createTable();
        this.createEvents();
    }

    createTable() {
        const tBody = document.createElement('tbody');
        for (let i = 0; i < this.rowCount; i++) {
            tBody.appendChild(this.makeRow());
        }
        this.table.appendChild(tBody);
    }

    makeRow() {
        const newTr = document.createElement('tr');
        newTr.className = 'b-tr';
        for (let i = 0; i < this.colCount; i++) {
            let element = document.createElement('td');
            element.className = 'item';
            newTr.appendChild(element);
        }
        return newTr;
    }

    createEvents() {
        this.addColumnBtn.addEventListener('click', this.addColumn.bind(this));
        this.addRowBtn.addEventListener('click', this.addRow.bind(this));
        /**this.table.addEventListener('mouseover', moveRemoveBtn);
        this.table.addEventListener('mouseout', hideRemoveBtn);

        this.removeRowBtn.addEventListener('mouseover', showRemoveBtn);
        this.removeRowBtn.addEventListener('mouseout', hideRemoveBtn);
        this.removeRowBtn.addEventListener('click', removeRow);

        this.removeColumnBtn.addEventListener('mouseover', showRemoveBtn);
        this.removeColumnBtn.addEventListener('mouseout', hideRemoveBtn);
        this.removeColumnBtn.addEventListener('click', removeColumn);*/
    }

    addColumn() {
        const trItems = this.table.querySelectorAll('.b-tr');
        for (let item of trItems) {
            let element = document.createElement('td');
            element.className = 'item';
            item.appendChild(element);
        }
    }

    addRow() {
        const tdItemsCount = this.table.querySelector('.b-tr').childElementCount;
        const newTr = document.createElement('tr');
        newTr.className = 'b-tr';

        for (let i = 0; i < tdItemsCount; i++) {
            let element = document.createElement('td');
            element.className = 'item';
            newTr.appendChild(element);
        }

        this.table.firstChild.appendChild(newTr);

    }

}

customElements.define('table-component', TableComponent);