"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePaymentInputs;

var _react = require("react");

var _typeCheck = require("type-check");

var _utils = _interopRequireDefault(require("../utils"));

var _images = _interopRequireDefault(require("../images"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _utils$formatter = _utils["default"].formatter,
    formatCardNumber = _utils$formatter.formatCardNumber,
    formatExpiry = _utils$formatter.formatExpiry;
var _utils$validator = _utils["default"].validator,
    hasCardNumberReachedMaxLength = _utils$validator.hasCardNumberReachedMaxLength,
    getCardNumberError = _utils$validator.getCardNumberError,
    getExpiryDateError = _utils$validator.getExpiryDateError,
    getCVCError = _utils$validator.getCVCError;
var getCardTypeByValue = _utils["default"].cardTypes.getCardTypeByValue;

var throwOnBadProps = function throwOnBadProps(_ref) {
  var onChangeText = _ref.onChangeText,
      value = _ref.value;

  if (!(0, _typeCheck.typeCheck)("Function", onChangeText)) {
    throw new Error("Expected Function onChangeText, encountered ".concat(onChangeText, "."));
  } else if (!(0, _typeCheck.typeCheck)("String", value)) {
    throw new Error("Expected String value, encountered ".concat(value, "."));
  }
};

function usePaymentInputs() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    images: _images["default"]
  },
      images = _ref2.images;

  var cardNumberRef = (0, _react.useRef)();
  var expiryRef = (0, _react.useRef)();
  var cvcRef = (0, _react.useRef)();
  var cardNumberOnce = (0, _.useOnce)();
  var expiryOnce = (0, _.useOnce)();
  var cvcOnce = (0, _.useOnce)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      cardNumberError = _useState2[0],
      setCardNumberError = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      expiryError = _useState4[0],
      setExpiryError = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      cvcError = _useState6[0],
      setCvcError = _useState6[1];

  var _useState7 = (0, _react.useState)({
    cardNumber: false,
    expiry: false,
    cvc: false
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      touchedInputs = _useState8[0],
      setTouchedInputs = _useState8[1];

  var touch = (0, _react.useCallback)(function (fieldName) {
    return setTouchedInputs(function (e) {
      return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, fieldName, true));
    });
  }, [setTouchedInputs]);
  var touchCardNumber = (0, _react.useCallback)(function () {
    return touch("cardNumber");
  }, [touch]);
  var touchExpiry = (0, _react.useCallback)(function () {
    return touch("expiry");
  }, [touch]);
  var touchCvc = (0, _react.useCallback)(function () {
    return touch("cvc");
  }, [touch]);

  var _useState9 = (0, _react.useState)({
    cardNumber: false,
    expiry: false,
    cvc: false
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      focusedInputs = _useState10[0],
      setFocusedInputs = _useState10[1];

  var setFocused = (0, _react.useCallback)(function (fieldName, isFocused) {
    return setFocusedInputs(function (e) {
      return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, fieldName, isFocused));
    });
  }, [setFocusedInputs]);
  var focusCardNumber = (0, _react.useCallback)(function () {
    return setFocused("cardNumber", true);
  }, [setFocused]);
  var blurCardNumber = (0, _react.useCallback)(function () {
    return setFocused("cardNumber", false);
  }, [setFocused]);
  var focusExpiry = (0, _react.useCallback)(function () {
    return setFocused("expiry", true);
  }, [setFocused]);
  var blurExpiry = (0, _react.useCallback)(function () {
    return setFocused("expiry", false);
  }, [setFocused]);
  var focusCvc = (0, _react.useCallback)(function () {
    return setFocused("cvc", true);
  }, [setFocused]);
  var blurCvc = (0, _react.useCallback)(function () {
    return setFocused("cvc", false);
  }, [setFocused]);

  var _useState11 = (0, _react.useState)(),
      _useState12 = _slicedToArray(_useState11, 2),
      cardType = _useState12[0],
      setCardType = _useState12[1];

  var getCardNumberProps = (0, _react.useCallback)(function (_ref3) {
    var onChangeText = _ref3.onChangeText,
        value = _ref3.value,
        placeholder = _ref3.placeholder,
        extras = _objectWithoutProperties(_ref3, ["onChangeText", "value", "placeholder"]);

    throwOnBadProps({
      onChangeText: onChangeText,
      value: value
    });

    var shouldSideEffect = function shouldSideEffect(str) {
      var value = formatCardNumber(str);
      var cardNumberError = getCardNumberError(value);
      var cardType = getCardTypeByValue(value);
      onChangeText(value);
      setCardNumberError(cardNumberError);
      setCardType(cardType);
      return {
        value: value,
        cardNumberError: cardNumberError,
        cardType: cardType
      };
    };

    cardNumberOnce(function () {
      return shouldSideEffect(value);
    });
    return _objectSpread(_objectSpread({
      placeholder: !placeholder ? "Card Number" : placeholder,
      textContentType: "creditCardNumber",
      selectTextOnFocus: true
    }, extras), {}, {
      ref: cardNumberRef,
      onChangeText: function onChangeText(str) {
        var _shouldSideEffect = shouldSideEffect(str),
            value = _shouldSideEffect.value,
            cardNumberError = _shouldSideEffect.cardNumberError;

        if (hasCardNumberReachedMaxLength(value) && !cardNumberError) {
          expiryRef.current && expiryRef.current.focus();
        }
      },
      onFocus: focusCardNumber,
      onBlur: function onBlur() {
        touchCardNumber();
        blurCardNumber();
      },
      value: value
    });
  }, [cardNumberRef, cardNumberOnce, setCardNumberError, expiryRef, touchCardNumber, focusCardNumber, blurCardNumber]);
  var getExpiryProps = (0, _react.useCallback)(function (_ref4) {
    var onChangeText = _ref4.onChangeText,
        value = _ref4.value,
        placeholder = _ref4.placeholder,
        extras = _objectWithoutProperties(_ref4, ["onChangeText", "value", "placeholder"]);

    throwOnBadProps({
      onChangeText: onChangeText,
      value: value
    });

    var shouldSideEffect = function shouldSideEffect(str) {
      var value = formatExpiry(str) || "";
      var expiryError = getExpiryDateError(value);
      onChangeText(value);
      setExpiryError(expiryError);
      return {
        value: value,
        expiryError: expiryError
      };
    };

    expiryOnce(function () {
      return shouldSideEffect(value);
    });
    return _objectSpread(_objectSpread({
      placeholder: !placeholder ? "Expiry MM/DD" : placeholder,
      keyboardType: "numeric",
      selectTextOnFocus: true
    }, extras), {}, {
      ref: expiryRef,
      onChangeText: function onChangeText(str) {
        var _shouldSideEffect2 = shouldSideEffect(str),
            value = _shouldSideEffect2.value,
            expiryError = _shouldSideEffect2.expiryError;

        if (!expiryError) {
          cvcRef.current && cvcRef.current.focus();
        }
      },
      onFocus: focusExpiry,
      onBlur: function onBlur() {
        touchExpiry();
        blurExpiry();
      },
      value: value
    });
  }, [expiryRef, expiryOnce, cvcRef, setExpiryError, touchExpiry, focusExpiry, blurExpiry]);
  var getCvcProps = (0, _react.useCallback)(function (_ref5) {
    var onChangeText = _ref5.onChangeText,
        value = _ref5.value,
        placeholder = _ref5.placeholder,
        extras = _objectWithoutProperties(_ref5, ["onChangeText", "value", "placeholder"]);

    throwOnBadProps({
      onChangeText: onChangeText,
      value: value
    });

    var shouldSideEffect = function shouldSideEffect(str) {
      // TODO: Implement formatting.
      var value = str;
      var cvcError = getCVCError(value, undefined, {
        cardType: cardType
      });
      onChangeText(value);
      setCvcError(cvcError);
      return {
        value: value,
        cvcError: cvcError
      };
    };

    cvcOnce(function () {
      return shouldSideEffect(value);
    });
    return _objectSpread(_objectSpread({
      placeholder: !placeholder ? "CVC" : placeholder,
      secureTextEntry: true,
      keyboardType: "numeric",
      selectTextOnFocus: true
    }, extras), {}, {
      ref: cvcRef,
      onChangeText: function onChangeText(str) {
        var _shouldSideEffect3 = shouldSideEffect(str);

        _objectDestructuringEmpty(_shouldSideEffect3);
      },
      onBlur: function onBlur() {
        touchCvc();
        blurCvc();
      },
      onFocus: focusCvc,
      value: value
    });
  }, [cvcRef, cvcOnce, setCvcError, cardType, touchCvc, focusCvc, blurCvc]);
  var getCardImageProps = (0, _react.useCallback)(function (_ref6) {
    var extras = _extends({}, _ref6);

    var imgs = images || {};
    var children = imgs[cardType ? cardType.type : "placeholder"];
    return _objectSpread(_objectSpread({
      viewBox: "0 0 24 16"
    }, extras), {}, {
      children: children
    });
  }, [images, cardType]);
  return {
    getCardNumberProps: getCardNumberProps,
    getExpiryProps: getExpiryProps,
    getCvcProps: getCvcProps,
    getCardImageProps: getCardImageProps,
    meta: {
      cardType: cardType,
      erroredInputs: Object.fromEntries(Object.entries({
        cardNumberError: cardNumberError,
        expiryError: expiryError,
        cvcError: cvcError
      }).filter(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        return !!v;
      })),
      touchedInputs: touchedInputs,
      focused: Object.entries(focusedInputs).filter(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            k = _ref10[0],
            v = _ref10[1];

        return v;
      }).map(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 1),
            k = _ref12[0];

        return k;
      })
    }
  };
}