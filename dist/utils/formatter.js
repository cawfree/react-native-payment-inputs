"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatExpiry = exports.formatCardNumber = void 0;

var cardTypes = _interopRequireWildcard(require("./cardTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var formatCardNumber = function formatCardNumber(cardNumber) {
  var cardType = cardTypes.getCardTypeByValue(cardNumber);
  if (!cardType) return (cardNumber.match(/\d+/g) || []).join("");
  var format = cardType.format;

  if (format && format.global) {
    return (cardNumber.match(format) || []).join(" ");
  }

  if (format) {
    var execResult = format.exec(cardNumber.split(" ").join(""));

    if (execResult) {
      return execResult.splice(1, 3).filter(function (x) {
        return x;
      }).join(" ");
    }
  }

  return cardNumber;
};

exports.formatCardNumber = formatCardNumber;

var formatExpiry = function formatExpiry(text) {
  var eventData = false; //event.nativeEvent && event.nativeEvent.data;

  var prevExpiry = (text || "").split(" / ").join("/");
  if (!prevExpiry) return null;
  var expiry = prevExpiry;

  if (/^[2-9]$/.test(expiry)) {
    expiry = "0".concat(expiry);
  }

  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    var _prevExpiry$split = prevExpiry.split(""),
        _prevExpiry$split2 = _toArray(_prevExpiry$split),
        head = _prevExpiry$split2[0],
        tail = _prevExpiry$split2.slice(1);

    expiry = "0".concat(head, "/").concat(tail.join(""));
  }

  if (/^1[/-]$/.test(expiry)) {
    return "01 / ";
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];

  if (expiry.length === 1) {
    if (!eventData && prevExpiry.includes("/")) {
      return expiry[0];
    }

    if (/\d{2}/.test(expiry)) {
      return "".concat(expiry[0], " / ");
    }
  }

  if (expiry.length > 2) {
    var _ref = expiry.join("").match(/^(\d{2}).*(\d{2})$/) || [],
        _ref2 = _slicedToArray(_ref, 3),
        _ref2$ = _ref2[1],
        month = _ref2$ === void 0 ? null : _ref2$,
        _ref2$2 = _ref2[2],
        year = _ref2$2 === void 0 ? null : _ref2$2;

    return [month, year].join(" / ");
  }

  return expiry.join(" / ");
};

exports.formatExpiry = formatExpiry;