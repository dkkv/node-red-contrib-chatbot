var _ = require('underscore');
var _s = require('underscore.string');


var validators = {

  isVariable: function(element) {
    return _.isString(element) && element.match(/^\{\{[A-Za-z0-9_-]*\}\}$/) != null;
  },

  invoiceItem: function(element) {
    return _.isObject(element)
      && _.isString(element.label) && !_.isEmpty(element.label)
      && (
        _.isNumber(element.amount)
        ||
        !_.isEmpty(element.amount) && !isNaN(parseFloat(element.amount))
        ||
        !_.isEmpty(element.amount) && validators.isVariable(element.amount)
      );
  },

  invoiceItems: function(elements) {
    return _.isArray(elements)
      && !_.isEmpty(elements)
      && _(elements).all(function(element) {
        return validators.invoiceItem(element);
      });
  },

  float: function(value) {
    return !isNaN(parseFloat(value));
  },

  button: function(button) {
    return _.isObject(button) && button.type != null;
  },

  buttons: function(buttons) {
    return _.isArray(buttons)
      && !_.isEmpty(buttons)
      && _(buttons).all(function(button) {
        return validators.button(button);
      });
  },

  genericTemplateElements: function(elements) {
    return _.isArray(elements)
      && !_.isEmpty(elements)
      && _(elements).all(function(element) {
        return validators.genericTemplateElement(element);
      });
  },

  genericTemplateElement: function(element) {
    return _.isObject(element)
      && !_.isEmpty(element.title)
      && _.isString(element.title)
      && _.isArray(element.buttons)
      && (element.buttons.length === 0 || validators.buttons(element.buttons));
  },

  filepath: function(filepath) {
    return _s.startsWith(filepath, './') || _s.startsWith(filepath, '../') || _s.startsWith(filepath, '/');
  },

  url: function(url) {
    var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return _.isString(url) && url.match(re) != null;
  },

  buffer: function(buffer) {
    return buffer instanceof Buffer;
  },

  string: function(value) {
    return _.isString(value) && !_.isEmpty(value);
  },

  boolean: function(value) {
    return _.isBoolean(value);
  },

  array: function(value) {
    return _.isArray(value) && !_.isEmpty(value);
  },

  nlpToken: function(token) {
    return token != null && token.match(/^([a-zA-Z0-9%$£# ]{1,}){0,1}(\[[a-zA-Z0-9]{1,}\]){0,1}(->[a-zA-Z0-9_]{1,}){0,1}$/) != null;
  },

  nlpTokens: function(tokens) {
    return !_.isEmpty(tokens) && _(tokens.split(',')).all(function(token) {
      return validators.nlpToken(token);
    });
  },

  integer: function(value) {
    return !isNaN(parseInt(value, 10));
  }

};
module.exports = validators;
