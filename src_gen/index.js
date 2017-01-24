/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var _assert, _isFunction, _runCheck;

_isFunction = __webpack_require__(0);

_assert = function (condition, errorMessage) {
  var error;
  if (!condition) {
    error = new Error(errorMessage);
    error.framesToPop = 2;
    throw error;
  }
};

_runCheck = function (arg) {
  var onError, onSuccess;
  onSuccess = arg.onSuccess, onError = arg.onError;
  return function (check) {
    return function (obj) {
      var e;
      try {
        check(obj);
      } catch (error1) {
        e = error1;
        return onError(e);
      }
      return onSuccess(obj);
    };
  };
};

module.exports = {
  fail: function (v) {
    return _assert(false, 'fail');
  },
  pass: function (v) {
    return void 0;
  },
  string: function (v) {
    return _assert(typeof v === 'string', v + " is not a string");
  },
  "function": function (v) {
    return _assert(_isFunction(v, v + " is not a function"));
  },
  equals: function (w) {
    return function (v) {
      return _assert(w === v, v + " is not equal to " + w);
    };
  },
  shape: function (predObj) {
    return function (v) {
      var key, results;
      results = [];
      for (key in predObj) {
        results.push(predObj[key](v[key]));
      }
      return results;
    };
  },
  pi: function (reflect) {
    return function (v) {
      return reflect(v)(v);
    };
  },
  all: function (checks) {
    return function (v) {
      var check, i, len, results;
      results = [];
      for (i = 0, len = checks.length; i < len; i++) {
        check = checks[i];
        results.push(check(v));
      }
      return results;
    };
  },
  toPromise: _runCheck({
    onSuccess: Promise.resolve,
    onError: Promise.reject
  }),
  toPred: _runCheck({
    onSuccess: function () {
      return true;
    },
    onError: function () {
      return false;
    }
  })
};

/***/ })
/******/ ]);