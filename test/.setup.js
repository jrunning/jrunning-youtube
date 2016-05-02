require('babel-register')();

var jsdom = require('jsdom').jsdom;
var chai = require('chai');
var sinon = require('sinon');

chai.use(require('sinon-chai'));

var exposedProperties = ['window', 'navigator', 'document'];

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

window.localStorage = window.sessionStorage = {
  items: {},

  clear: function () {
    this.items = {};
  },

  getItem: function (key) {
    return this.items[key];
  },

  removeItem: function (key) {
    delete this.items[key];
  },

  setItem: function (key, value) {
    this.items[key] = value;
  },
};
