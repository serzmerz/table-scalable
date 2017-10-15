import React, {Component} from 'react';
import './index.css';
import classNames from 'classnames';
import Table from "../Table/index";

class TableManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rowCount: this.props.rows,
            colCount: this.props.cols,
            colIndex: 0,
            rowIndex: 0,
            timeOutId: 0,
            removeColumnBtnClass: true,
            removeRowBtnClass: true,
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

    componentDidMount() {
        this.setState({items: this.makeTableItems()});
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

    addColumn = () => {

        this.setState({colCount: this.state.colCount + 1}, function () {
            this.setState({items: this.makeTableItems()});
        });

    };

    addRow = () => {

        this.setState({rowCount: this.state.rowCount + 1}, function () {
            this.setState({items: this.makeTableItems()});
        });

    };

    showRemoveBtn = () => {

        clearTimeout(this.state.timeOutId);
        if (this.state.colCount > 1)
            this.setState({removeColumnBtnClass: false});
        if (this.state.rowCount > 1)
            this.setState({removeRowBtnClass: false});

    };

    moveRemoveBtn = (event) => {
        this.showRemoveBtn();
        const target = event.target;
        if (target.tagName === 'TD') {
            this.setState({
                styles: {
                    ...this.state.styles,
                    removeColumnBtn: {left: target.offsetLeft},
                    removeRowBtn: {top: target.offsetTop}
                },
                colIndex: target.cellIndex,
                rowIndex: target.parentNode.rowIndex
            });
        }
    };

    hideRemoveBtn = () => {

        const timeOutId = setTimeout(() => {
            this.setState({removeColumnBtnClass: true, removeRowBtnClass: true})
        }, 200);
        this.setState({timeOutId: timeOutId});

    };

    removeColumn = () => {

        const newArr = this.state.items.map((item) => {
            return [
                ...item.slice(0, this.state.colIndex),
                ...item.slice(this.state.colIndex + 1)
            ];
        });
        this.setState({
            items: newArr,
            colCount: this.state.colCount - 1, removeColumnBtnClass: true
        });

    };

    removeRow = () => {

        const newItems = [
            ...this.state.items.slice(0, this.state.rowIndex),
            ...this.state.items.slice(this.state.rowIndex + 1)
        ];
        this.setState({items: newItems, rowCount: this.state.rowCount - 1, removeRowBtnClass: true});

    };

    render() {

        return (
            <div className="b-container">
                <button className={classNames('b-btn', 'b-remove', 'b-remove-column',
                    {'b-btn-hidden': this.state.removeColumnBtnClass})}
                        style={this.state.styles.removeColumnBtn}
                        onMouseOver={this.showRemoveBtn}
                        onMouseLeave={this.hideRemoveBtn}
                        onClick={this.removeColumn}
                >-
                </button>
                <button className={classNames('b-btn', 'b-remove', 'b-remove-row',
                    {'b-btn-hidden': this.state.removeRowBtnClass})}
                        style={this.state.styles.removeRowBtn}
                        onMouseOver={this.showRemoveBtn}
                        onMouseLeave={this.hideRemoveBtn}
                        onClick={this.removeRow}
                >-
                </button>
                <Table onMouseOver={this.moveRemoveBtn} onMouseLeave={this.hideRemoveBtn} items={this.state.items}/>
                <button className="b-btn b-add-column" onClick={this.addColumn}>+</button>
                <button className="b-btn b-add-row" onClick={this.addRow}>+</button>
            </div>
        );

    }
}

export default TableManage;
