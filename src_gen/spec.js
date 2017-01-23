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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _assert, _isFunction, _runCheck;

_isFunction = __webpack_require__(2);

_assert = function (condition, errorMessage) {
  var error;
  if (!condition) {
    error = new Error(errorMessage);
    error.framesToPop = 1;
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
    return _assert(typeof v === 'string', 'not string');
  },
  "function": function (v) {
    return _assert(_isFunction(v, 'not function'));
  },
  equals: function (w) {
    return function (v) {
      return _assert(w === v, 'not equal');
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("tape");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var N, test;

test = __webpack_require__(1);

N = __webpack_require__(0);

test('string', function (_) {
  return _.test('works', function (_) {
    _.ok(N.toPred(N.string)('asdf'));
    _.ok(N.toPred(N.string)(''));
    _.notok(N.toPred(N.string)(1));
    _.notok(N.toPred(N.string)({}));
    _.notok(N.toPred(N.string)([]));
    return _.end();
  });
});

test('fail', function (_) {
  return _.test('works', function (_) {
    _.notok(N.toPred(N.fail)(''));
    _.notok(N.toPred(N.fail)({}));
    _.notok(N.toPred(N.fail)([]));
    _.notok(N.toPred(N.fail)(1));
    return _.end();
  });
});

test('pass', function (_) {
  return _.test('works', function (_) {
    _.ok(N.toPred(N.pass)(''));
    _.ok(N.toPred(N.pass)({}));
    _.ok(N.toPred(N.pass)([]));
    _.ok(N.toPred(N.pass)(1));
    return _.end();
  });
});

test('shape', function (_) {
  return _.test('works', function (_) {
    var pred;
    pred = N.toPred(N.shape({
      foo: N.string,
      bar: N.string
    }));
    _.ok(pred({
      foo: 'hello',
      bar: 'world'
    }));
    _.notok(pred({
      foo: 'hello',
      bar: 1
    }));
    _.notok(pred({
      foo: 1,
      bar: 'world'
    }));
    return _.end();
  });
});

test('pi', function (_) {
  return _.test('works', function (_) {
    var pred;
    pred = N.toPred(N.pi(function (arg) {
      var foo;
      foo = arg.foo;
      return N.shape({
        bar: N.equals(foo)
      });
    }));
    _.ok(pred({
      foo: 'hello',
      bar: 'hello'
    }));
    _.notok(pred({
      foo: 'hello',
      bar: 'world'
    }));
    return _.end();
  });
});

test('all', function (_) {
  return _.test('works', function (_) {
    var pred;
    pred = N.toPred(N.all([N.shape({
      foo: N.equals('hello')
    }), N.shape({
      bar: N.equals('world')
    })]));
    _.ok(pred({
      foo: 'hello',
      bar: 'world'
    }));
    _.notok(pred({
      foo: '',
      bar: 'world'
    }));
    _.notok(pred({
      foo: 'hello',
      bar: ''
    }));
    _.notok(pred({
      foo: '',
      bar: ''
    }));
    return _.end();
  });
});

/***/ })
/******/ ]);