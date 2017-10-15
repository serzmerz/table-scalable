import React, { Component } from 'react';

class Table extends Component {

    renderTable() {
        /*for (let i = 0; i < this.state.items.count; i++) {
            rows.push(this.makeRow(i));
        }*/
        let rows = this.props.items.map((item, index) => {
            return this.makeRow(index, item)
        });
        return <tbody>{rows}</tbody>;

    }

    makeRow(key, row) {

        let elements = row.map((item, index) => {
            return <td key={index} className="item"/>;
        });
        /*for (let i = 0; i < this.items.state.colCount; i++) {
            elements.push(<td key={i} className="item"/>);
            }*/
        return <tr key={key} className="b-tr">{elements}</tr>;

    }

    render() {
        let tbody = this.renderTable();

        return (
            <table className="b-table" onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave}>{tbody}</table>
        );
    }
}

export default Table;
