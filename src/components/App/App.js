import React, {Component} from 'react';
import './App.css';
import TableManage from "../TableManage/index";

class App extends Component {
    render() {
        return (
            <div>
                <TableManage rows={4} cols={5}/>
                <TableManage rows={7} cols={4}/>
            </div>
        );
    }
}

export default App;
