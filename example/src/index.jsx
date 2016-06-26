import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, Redirect }  from 'react-router';
import ReactDOM from "react-dom";

import reactNotice from './react-notice';

class Main extends Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.number = 0;
  }
  componentDidMount() {

  }

  click(time) {
    this.number++;
    reactNotice.show(<a className="das" href="http://www.baidu1.com" style = {{color:"#ffffff"}}><span>{this.number}</span>12312123</a>,{closeTime:time})
  }

  showMessage() {
    reactNotice.getHistoryMessages();
  }

  render() {
      return(
        <div className = "main">
          <button onClick = {() => {this.click(3000)}}>弹出</button>
          <button onClick = {() => {this.click("infinite")}}>弹出 时间infinite</button>
          <button onClick = {this.showMessage.bind(this)}>历史记录</button>
        </div>
      )
  }

}

ReactDOM.render(<Main />, document.getElementById('app'));
