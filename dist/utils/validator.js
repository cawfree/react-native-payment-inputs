"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getZIPError = exports.getCVCError = exports.getExpiryDateError = exports.getCardNumberError = exports.validateLuhn = exports.isNumeric = exports.hasCardNumberReachedMaxLength = exports.DATE_OUT_OF_RANGE = exports.YEAR_OUT_OF_RANGE = exports.MONTH_OUT_OF_RANGE = exports.INVALID_CVC = exports.INVALID_EXPIRY_DATE = exports.INVALID_CARD_NUMBER = exports.EMPTY_ZIP = exports.EMPTY_CVC = exports.EMPTY_EXPIRY_DATE = exports.EMPTY_CARD_NUMBER = void 0;

var cardTypes = _interopRequireWildcard(require("./cardTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MONTH_REGEX = /(0[1-9]|1[0-2])/;
var EMPTY_CARD_NUMBER = "Enter a card number";
exports.EMPTY_CARD_NUMBER = EMPTY_CARD_NUMBER;
var EMPTY_EXPIRY_DATE = "Enter an expiry date";
exports.EMPTY_EXPIRY_DATE = EMPTY_EXPIRY_DATE;
var EMPTY_CVC = "Enter a CVC";
exports.EMPTY_CVC = EMPTY_CVC;
var EMPTY_ZIP = "Enter a ZIP code";
exports.EMPTY_ZIP = EMPTY_ZIP;
var INVALID_CARD_NUMBER = "Card number is invalid";
exports.INVALID_CARD_NUMBER = INVALID_CARD_NUMBER;
var INVALID_EXPIRY_DATE = "Expiry date is invalid";
exports.INVALID_EXPIRY_DATE = INVALID_EXPIRY_DATE;
var INVALID_CVC = "CVC is invalid";
exports.INVALID_CVC = INVALID_CVC;
var MONTH_OUT_OF_RANGE = "Expiry month must be between 01 and 12";
exports.MONTH_OUT_OF_RANGE = MONTH_OUT_OF_RANGE;
var YEAR_OUT_OF_RANGE = "Expiry year cannot be in the past";
exports.YEAR_OUT_OF_RANGE = YEAR_OUT_OF_RANGE;
var DATE_OUT_OF_RANGE = "Expiry date cannot be in the past";
exports.DATE_OUT_OF_RANGE = DATE_OUT_OF_RANGE;

var hasCardNumberReachedMaxLength = function hasCardNumberReachedMaxLength(currentValue) {
  var cardType = cardTypes.getCardTypeByValue(currentValue);
  return cardType && currentValue.length >= cardType.lengths[cardType.lengths.length - 1];
};

exports.hasCardNumberReachedMaxLength = hasCardNumberReachedMaxLength;

var isNumeric = function isNumeric(e) {
  return /^\d*$/.test(e.nativeEvent.key);
};

exports.isNumeric = isNumeric;

var validateLuhn = function validateLuhn(cardNumber) {
  return cardNumber.split("").reverse().map(function (digit) {
    return parseInt(digit, 10);
  }).map(function (digit, idx) {
    return idx % 2 ? digit * 2 : digit;
  }).map(function (digit) {
    return digit > 9 ? digit % 10 + 1 : digit;
  }).reduce(function (accum, digit) {
    return accum += digit;
  }) % 10 === 0;
};

exports.validateLuhn = validateLuhn;

var getCardNumberError = function getCardNumberError(cardNumber, cardNumberValidator) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$errorMessages = _ref.errorMessages,
      errorMessages = _ref$errorMessages === void 0 ? {} : _ref$errorMessages;

  if (!cardNumber) {
    return errorMessages.emptyCardNumber || EMPTY_CARD_NUMBER;
  }

  var rawCardNumber = cardNumber.replace(/\s/g, "");
  var cardType = cardTypes.getCardTypeByValue(rawCardNumber);

  if (cardType && cardType.lengths) {
    var doesCardNumberMatchLength = cardType.lengths.includes(rawCardNumber.length);

    if (doesCardNumberMatchLength) {
      var isLuhnValid = validateLuhn(rawCardNumber);

      if (isLuhnValid) {
        if (cardNumberValidator) {
          return cardNumberValidator({
            cardNumber: rawCardNumber,
            cardType: cardType,
            errorMessages: errorMessages
          });
        }

        return;
      }
    }
  }

  return errorMessages.invalidCardNumber || INVALID_CARD_NUMBER;
};

exports.getCardNumberError = getCardNumberError;

var getExpiryDateError = function getExpiryDateError(expiryDate, expiryValidator) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$errorMessages = _ref2.errorMessages,
      errorMessages = _ref2$errorMessages === void 0 ? {} : _ref2$errorMessages;

  if (!expiryDate) {
    return errorMessages.emptyExpiryDate || EMPTY_EXPIRY_DATE;
  }

  var rawExpiryDate = expiryDate.replace(" / ", "").replace("/", "");

  if (rawExpiryDate.length === 4) {
    var month = rawExpiryDate.slice(0, 2);
    var year = "20".concat(rawExpiryDate.slice(2, 4));

    if (!MONTH_REGEX.test(month)) {
      return errorMessages.monthOutOfRange || MONTH_OUT_OF_RANGE;
    }

    if (parseInt(year) < new Date().getFullYear()) {
      return errorMessages.yearOutOfRange || YEAR_OUT_OF_RANGE;
    }

    if (parseInt(year) === new Date().getFullYear() && parseInt(month) < new Date().getMonth() + 1) {
      return errorMessages.dateOutOfRange || DATE_OUT_OF_RANGE;
    }

    if (expiryValidator) {
      return expiryValidator({
        expiryDate: {
          month: month,
          year: year
        },
        errorMessages: errorMessages
      });
    }

    return;
  }

  return errorMessages.invalidExpiryDate || INVALID_EXPIRY_DATE;
};

exports.getExpiryDateError = getExpiryDateError;

var getCVCError = function getCVCError(cvc, cvcValidator) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      cardType = _ref3.cardType,
      _ref3$errorMessages = _ref3.errorMessages,
      errorMessages = _ref3$errorMessages === void 0 ? {} : _ref3$errorMessages;

  if (!cvc) {
    return errorMessages.emptyCVC || EMPTY_CVC;
  }

  if (cvc.length < 3) {
    return errorMessages.invalidCVC || INVALID_CVC;
  }

  if (cardType && cvc.length !== cardType.code.length) {
    return errorMessages.invalidCVC || INVALID_CVC;
  }

  if (cvcValidator) {
    return cvcValidator({
      cvc: cvc,
      cardType: cardType,
      errorMessages: errorMessages
    });
  }

  return;
};

exports.getCVCError = getCVCError;

var getZIPError = function getZIPError(zip) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref4$errorMessages = _ref4.errorMessages,
      errorMessages = _ref4$errorMessages === void 0 ? {} : _ref4$errorMessages;

  if (!zip) {
    return errorMessages.emptyZIP || EMPTY_ZIP;
  }

  return;
};

exports.getZIPError = getZIPError;