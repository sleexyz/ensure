_isFunction = require 'lodash/isFunction'

_assert = (condition, errorMessage) ->
  unless condition
    error = new Error errorMessage
    error.framesToPop = 1
    throw error

_runCheck = ({onSuccess, onError}) -> (check) -> (obj) ->
  try
    check obj
  catch e
    return onError e
  onSuccess obj

module.exports =
  # basic predicates
  fail: (v) -> _assert false, 'fail'

  pass: (v) -> undefined

  string: (v) -> _assert typeof v is 'string', 'not string'

  function: (v) -> _assert _isFunction v, 'not function'

  equals: (w) -> (v) -> _assert w is v, 'not equal'

  # combinators
  shape: (predObj) -> (v) -> predObj[key](v[key]) for key of predObj

  pi: (reflect) -> (v) -> reflect(v)(v)

  all: (checks) -> (v) -> check v for check in checks



  # convertors
  toPromise: _runCheck
    onSuccess: Promise.resolve
    onError: Promise.reject

  toPred: _runCheck
    onSuccess: -> true
    onError: -> false
