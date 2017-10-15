import React, {Component} from 'react';

class Table extends Component {

    renderTable() {

        let rows = this.props.items.map((item, index) => {
            return Table.makeRow(index, item)
        });
        return <tbody>{rows}</tbody>;

    }

    static makeRow(key, row) {

        let elements = row.map((item, index) => {
            return <td key={index} className="item"/>;
        });
        return <tr key={key} className="b-tr">{elements}</tr>;

    }

    render() {
        let tbody = this.renderTable();

        return (
            <table className="b-table" onMouseOver={this.props.onMouseOver}
                   onMouseLeave={this.props.onMouseLeave}>{tbody}</table>
        );
    }
}

export default Table;
