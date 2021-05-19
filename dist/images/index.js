"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _amex = _interopRequireDefault(require("./amex.js"));

var _dinersclub = _interopRequireDefault(require("./dinersclub.js"));

var _discover = _interopRequireDefault(require("./discover.js"));

var _hipercard = _interopRequireDefault(require("./hipercard.js"));

var _jcb = _interopRequireDefault(require("./jcb.js"));

var _unionpay = _interopRequireDefault(require("./unionpay.js"));

var _mastercard = _interopRequireDefault(require("./mastercard.js"));

var _placeholder = _interopRequireDefault(require("./placeholder.js"));

var _visa = _interopRequireDefault(require("./visa.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  amex: _amex["default"],
  dinersclub: _dinersclub["default"],
  discover: _discover["default"],
  hipercard: _hipercard["default"],
  jcb: _jcb["default"],
  unionpay: _unionpay["default"],
  mastercard: _mastercard["default"],
  placeholder: _placeholder["default"],
  visa: _visa["default"]
};
exports["default"] = _default;