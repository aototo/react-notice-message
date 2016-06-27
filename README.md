[![NPM](https://badge.fury.io/js/react-select.png)](https://www.npmjs.com/package/react-select)


React-notice-message (通知信息组件)
============

a simple and free messages notice with and for [React](http://facebook.github.io/react/index.html).

## Demo & Examples

Live demo: [asd0102433.github.io/react-notice-message/example](https://asd0102433.github.io/react-notice-message/example/)

The live demo is still running `v1.0.8`.

To build the **new 1.0.0** examples locally, clone this repo then run:

```javascript
npm install
npm start

```

Then open [`localhost:8080`](http://localhost:8080) in a browser.
或者直接 open example/index.html

## Installation

```javascript
npm install react-notice-message --save
```

At this point you can import react-notice-message and its styles in your application as follows:

```js
import reactNotice from 'react-notice-message';

// you can modify css in the react-notice.css or Write one other css style , because the css is simple and crude.
import 'react-select/react-notice.css';
```



## Usage

```javascript
var reactNotice = require('react-notice-message');

//reactNotice.show(document, {closeTime:"3000"});
reactNotice.show(<p>messages</p>, options); //Value: 3000 or infinite
reactNotice.getHistoryMessages();
```

###options

* `closeTime`: Any time, 3000 5000 or infinite;


### Methods


```javascript
// Show notice messages
reactNotice.show();

//Get history messages
reactNotice.getHistoryMessages();
```



# License

MIT Licensed. Copyright (c) aotumen 2016.
