import PubSub from 'pubsub-js';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

let historyMessages = [];

let noticesMessages = [];

let containerDOM = null;

let containerElement = null;

let removeTime = null;

const ADD_MESSAGE = 'ADD_MESSAGE';

const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }

    this.removeMessage = this.removeMessage.bind(this);
    this.publish = this.publish.bind(this);
  }

  removeMessage() {
    this.publish(this.props.index);
  }

  publish(index) {
    PubSub.publishSync(REMOVE_MESSAGE ,{
      index: index
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({active: true})
    }, 1)

    if (removeTime) {
      setTimeout(() => {
        this.publish(this.props.index);
      }, removeTime)
    }

  }

  componentWillUnmount() {

  }

  render() {
    let className = classnames(
      "notice-box",
      {
        active: this.state.active
      }
    )
    return(
      <div className = {className}>
        <a className="close" title="close" onClick = {this.removeMessage}>x</a>
        { this.props.content }
      </div>
    )
  }

}

class Notice extends Component {
  componentDidMount() {
  }
  //
  render() {

    let items = this.props.notices.map((msg, i) => {
      if ( msg == "") {
        return false;
      }
      return (
        <Item key = {i} index = {i} ref = {i} {...msg} />
      )
    })

    return (
      <div className = "notice-container">
        { items }
      </div>
    )
  }
}

PubSub.subscribe(ADD_MESSAGE, (topic, data) => {
  noticesMessages = [...noticesMessages, data];

  renderNotice();
});

var remove_notice = PubSub.subscribe(REMOVE_MESSAGE, (topic, data) => {
  let { index } = data;

  if (!noticesMessages[index]) {
    return false;
  }

  let historyMessage = noticesMessages[index].content;
  historyMessages.push(historyMessage);
  noticesMessages.splice(index, 1,"");

  renderNotice();
});

Notice.getHistoryMessages = function() {

  console.log(historyMessages);
  return historyMessages;
}

Notice.show = function(content, param) {
  if( !containerDOM ) {
    containerDOM = document.createElement('div');
    document.body.appendChild( containerDOM );
  }

  if ( param.closeTime ) {
    if ( param.closeTime == "infinite") {
      removeTime = false;
    } else {
      removeTime = Number( param.closeTime ) || 3000;
    }
  }

  PubSub.publishSync(ADD_MESSAGE, {
    content,
    closeTime: param.closeTime
  });

  return containerElement;

}


function renderNotice() {
  containerElement = ReactDOM.render(<Notice notices={noticesMessages} />,
    containerDOM
  );
}

module.exports = Notice;
