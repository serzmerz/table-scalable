import React, { Component } from 'react';
import './index.css';
import classNames from 'classnames';
import Table from "../Table/index";

class TableManage extends Component {

    constructor(props){
        super(props);
        this.state = {
            rowCount: this.props.rows,
            colCount: this.props.cols,
            colIndex: 0,
            rowIndex: 0,
            timeOutId: 0,
            removeBtnClass: true,
            styles: {
                removeColumnBtn: {
                    left: 0
                },
                removeRowBtn: {
                    top: 0
                }
            },
            items: []
        };
    }

    componentDidMount(){
        this.setState({items:this.makeTableItems()});
    }

    makeTableItems() {

        let rows = [];
        for (let i = 0; i < this.state.rowCount; i++) {
            rows.push(this.makeTableRows(i));
        }

        return rows;

    }

    makeTableRows() {

        let elements = [];
        for (let i = 0; i < this.state.colCount; i++) {
            elements.push(i);
        }
        return elements;

    }

    addColumn =() => {
        /*const newItems = [];
            this.state.items.forEach((item, index) => {
            item.push(index);
            newItems.push(item);
            });
        this.setState({items: newItems});*/
        this.setState({colCount: this.state.colCount + 1}, function () {
            this.setState({items: this.makeTableItems()});
        });
    };

    addRow = () => {
        this.setState({rowCount: this.state.rowCount + 1}, function () {
            this.setState({items: this.makeTableItems()});
        });
        /*const newItems = this.state.items;
        newItems.push(this.makeTableRows());*/
    };

    showRemoveBtn = () => {

        clearTimeout(this.state.timeOutId);

        this.setState({ removeBtnClass: false });
        /*if (this.table.querySelector('.b-tr').childElementCount > 1) {
            this.removeColumnBtn.classList.remove("b-btn-hidden");
        }*/

        /*if (this.table.rows.length > 1) {
            this.removeRowBtn.classList.remove("b-btn-hidden");
        }*/

    };

    moveRemoveBtn = (event) => {
        this.showRemoveBtn();
        const target = event.target;
        if (target.tagName === 'TD') {
            this.setState({ styles: {...this.state.styles,
                removeColumnBtn: { left: target.offsetLeft },
                removeRowBtn: {top: target.offsetTop}} });
            this.setState({ colIndex: target.colIndex });
            this.setState({ rowIndex: target.parentNode.rowIndex });
        }
    };

    hideRemoveBtn = () => {
        const timeOutId = setTimeout(() => {
        this.setState({ removeBtnClass: true })}, 200);
        this.setState({timeOutId: timeOutId});
    };

    removeColumn = () => {
        console.log('rr');
    };

    removeRow = () => {
      console.log('remove');

        /*const tr = this.table.querySelectorAll('.b-tr');
        tr[this.rowIndex].remove();
        this.removeRowBtn.classList.add("b-btn-hidden");*/
    };

    render() {
        return (
            <div className="b-container">
                <button className={classNames('b-btn', 'b-remove', 'b-remove-column',
                    { 'b-btn-hidden': this.state.removeBtnClass })}
                        style={this.state.styles.removeColumnBtn}
                        onMouseOver={this.showRemoveBtn}
                        onMouseLeave={this.hideRemoveBtn}
                        onClick={this.removeColumn}
                >-</button>
                <button className={classNames('b-btn', 'b-remove', 'b-remove-row',
                    { 'b-btn-hidden': this.state.removeBtnClass })}
                        style={this.state.styles.removeRowBtn}
                        onMouseOver={this.showRemoveBtn}
                        onMouseLeave={this.hideRemoveBtn}
                        onClick={this.removeRow}
                >-</button>
                <Table onMouseOver={this.moveRemoveBtn} onMouseLeave={this.hideRemoveBtn} items={this.state.items}/>
                <button className="b-btn b-add-column" onClick={this.addColumn}>+</button>
                <button className="b-btn b-add-row" onClick={this.addRow}>+</button>
            </div>
        );
    }
}

export default TableManage;
