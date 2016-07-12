(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FontMetrics", [], factory);
	else if(typeof exports === 'object')
		exports["FontMetrics"] = factory();
	else
		root["FontMetrics"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/output/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// ——————————————————————————————————————————————————
	// Variables
	// ——————————————————————————————————————————————————

	var initialized = false;
	var padding = void 0;
	var context = void 0;
	var canvas = void 0;

	// ——————————————————————————————————————————————————
	// Settings
	// ——————————————————————————————————————————————————

	var settings = {
	  chars: {
	    capHeight: 'S',
	    baseline: 'n',
	    xHeight: 'x',
	    descent: 'p',
	    ascent: 'h',
	    tittle: 'i'
	  }
	};

	// ——————————————————————————————————————————————————
	// Methods
	// ——————————————————————————————————————————————————

	var initialize = function initialize() {
	  canvas = document.createElement('canvas');
	  context = canvas.getContext('2d');
	  initialized = true;
	};

	var setFont = function setFont(fontFamily, fontSize, fontWeight) {
	  if (!initialized) initialize();
	  padding = fontSize * 0.5;
	  canvas.width = fontSize * 2;
	  canvas.height = fontSize * 2 + padding;
	  context.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
	  context.textBaseline = 'top';
	  context.textAlign = 'center';
	};

	var setAlignment = function setAlignment() {
	  var baseline = arguments.length <= 0 || arguments[0] === undefined ? 'top' : arguments[0];

	  var ty = baseline === 'bottom' ? canvas.height : 0;
	  context.setTransform(1, 0, 0, 1, 0, ty);
	  context.textBaseline = baseline;
	};

	var updateText = function updateText(text) {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  context.fillText(text, canvas.width / 2, padding, canvas.width);
	};

	var computeLineHeight = function computeLineHeight() {
	  var letter = 'A';
	  setAlignment('bottom');
	  var gutter = canvas.height - measureBottom(letter);
	  setAlignment('top');
	  return measureBottom(letter) + gutter;
	};

	var getPixels = function getPixels(text) {
	  updateText(text);
	  return context.getImageData(0, 0, canvas.width, canvas.height).data;
	};

	var getFirstIndex = function getFirstIndex(pixels) {
	  for (var i = 3, n = pixels.length; i < n; i += 4) {
	    if (pixels[i] > 0) return (i - 3) / 4;
	  }return pixels.length;
	};

	var getLastIndex = function getLastIndex(pixels) {
	  for (var i = pixels.length - 1; i >= 3; i -= 4) {
	    if (pixels[i] > 0) return i / 4;
	  }return 0;
	};

	var normalize = function normalize(metrics, fontSize, origin) {
	  var result = {};
	  var offset = metrics[origin];
	  for (var key in metrics) {
	    result[key] = (metrics[key] - offset) / fontSize;
	  }
	  return result;
	};

	var measureTop = function measureTop(text) {
	  return Math.round(getFirstIndex(getPixels(text)) / canvas.width) - padding;
	};

	var measureBottom = function measureBottom(text) {
	  return Math.round(getLastIndex(getPixels(text)) / canvas.width) - padding;
	};

	var getMetrics = function getMetrics() {
	  var chars = arguments.length <= 0 || arguments[0] === undefined ? settings.chars : arguments[0];
	  return {
	    capHeight: measureTop(chars.capHeight),
	    baseline: measureBottom(chars.baseline),
	    xHeight: measureTop(chars.xHeight),
	    descent: measureBottom(chars.descent),
	    bottom: computeLineHeight(),
	    ascent: measureTop(chars.ascent),
	    tittle: measureTop(chars.tittle),
	    top: 0
	  };
	};

	// ——————————————————————————————————————————————————
	// FontMetrics
	// ——————————————————————————————————————————————————

	var FontMetrics = function FontMetrics() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$fontFamily = _ref.fontFamily;
	  var fontFamily = _ref$fontFamily === undefined ? 'Times' : _ref$fontFamily;
	  var _ref$fontWeight = _ref.fontWeight;
	  var fontWeight = _ref$fontWeight === undefined ? 'normal' : _ref$fontWeight;
	  var _ref$fontSize = _ref.fontSize;
	  var fontSize = _ref$fontSize === undefined ? 200 : _ref$fontSize;
	  var _ref$origin = _ref.origin;
	  var origin = _ref$origin === undefined ? 'baseline' : _ref$origin;
	  return setFont(fontFamily, fontSize, fontWeight), _extends({}, normalize(getMetrics(), fontSize, origin), {
	    fontFamily: fontFamily,
	    fontWeight: fontWeight,
	    fontSize: fontSize
	  });
	};

	FontMetrics.settings = settings;

	// ——————————————————————————————————————————————————
	// Exports
	// ——————————————————————————————————————————————————

	exports.default = FontMetrics;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;