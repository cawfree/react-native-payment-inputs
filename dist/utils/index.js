"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isHighlighted = exports.ENTER_KEY_CODE = exports.BACKSPACE_KEY_CODE = void 0;

var cardTypes = _interopRequireWildcard(require("./cardTypes"));

var formatter = _interopRequireWildcard(require("./formatter"));

var validator = _interopRequireWildcard(require("./validator"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BACKSPACE_KEY_CODE = "Backspace";
exports.BACKSPACE_KEY_CODE = BACKSPACE_KEY_CODE;
var ENTER_KEY_CODE = "Enter";
exports.ENTER_KEY_CODE = ENTER_KEY_CODE;

var isHighlighted = function isHighlighted() {
  return (window.getSelection() || {
    type: undefined
  }).type === "Range";
};

exports.isHighlighted = isHighlighted;
var _default = {
  cardTypes: cardTypes,
  formatter: formatter,
  validator: validator,
  BACKSPACE_KEY_CODE: BACKSPACE_KEY_CODE,
  ENTER_KEY_CODE: ENTER_KEY_CODE,
  isHighlighted: isHighlighted
};
exports["default"] = _default;