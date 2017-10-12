class TableComponent extends HTMLElement {
    constructor() {
        super();
        const rows = Number(this.getAttribute("rows"));
        const cols = Number(this.getAttribute("cols"));
        this.rowCount = rows > 0 ? rows : 4;
        this.colCount = cols > 0 ? cols : 4;
        this.colIndex = 0;
        this.rowIndex = 0;
        this.timeOutId = 0;

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
        this.table.addEventListener('mouseover', this.moveRemoveBtn.bind(this));
        this.table.addEventListener('mouseleave', this.hideRemoveBtn.bind(this));

        this.removeRowBtn.addEventListener('mouseover', this.showRemoveBtn.bind(this));
        this.removeRowBtn.addEventListener('mouseleave', this.hideRemoveBtn.bind(this));
        this.removeRowBtn.addEventListener('click', this.removeRow.bind(this));

        this.removeColumnBtn.addEventListener('mouseover', this.showRemoveBtn.bind(this));
        this.removeColumnBtn.addEventListener('mouseleave', this.hideRemoveBtn.bind(this));
        this.removeColumnBtn.addEventListener('click', this.removeColumn.bind(this));
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

    showRemoveBtn() {
        clearTimeout(this.timeOutId);
        if (this.table.querySelector('.b-tr').childElementCount > 1) {
            this.removeColumnBtn.classList.remove("b-btn-hidden");
        }
        if (this.table.rows.length > 1) {
            this.removeRowBtn.classList.remove("b-btn-hidden");
        }
    }

    moveRemoveBtn() {

        this.showRemoveBtn();
        const target = event.target;
        if (target.tagName === 'TD') {
            this.removeColumnBtn.style.left = `${target.offsetLeft}px`;
            this.removeRowBtn.style.top = `${target.offsetTop}px`;
            this.colIndex = target.cellIndex;
            this.rowIndex = target.parentNode.rowIndex;
        }
    }

    hideRemoveBtn() {
        this.timeOutId = setTimeout(()=> {
            this.removeColumnBtn.classList.add("b-btn-hidden");
            this.removeRowBtn.classList.add("b-btn-hidden");
        },200);
        }

    removeRow() {
        const tr = this.table.querySelectorAll('.b-tr');
        tr[this.rowIndex].remove();
        this.removeRowBtn.classList.add("b-btn-hidden");
    }

    removeColumn() {
        const trItems = this.table.querySelectorAll('.b-tr');
        for (let item of trItems) {
            item.querySelectorAll('.item')[this.colIndex].remove();
        }
        this.removeColumnBtn.classList.add("b-btn-hidden");

    }

}

customElements.define('table-component', TableComponent);