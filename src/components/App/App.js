import React, { Component } from 'react';
import './App.css';
import TableManage from "../TableManage/index";

class App extends Component {
  render() {
    return (
      <TableManage rows={4} cols={5}/>
    );
  }
}

export default App;
