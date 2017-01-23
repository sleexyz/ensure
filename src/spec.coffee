test = require 'tape'
N = require './'

# Predicates

test 'string', (_) ->
  _.test 'works', (_) ->
    _.ok N.toPred(N.string) 'asdf'
    _.ok N.toPred(N.string) ''
    _.notok N.toPred(N.string) 1
    _.notok N.toPred(N.string) {}
    _.notok N.toPred(N.string) []
    _.end()

test 'fail', (_) ->
  _.test 'works', (_) ->
    _.notok N.toPred(N.fail) ''
    _.notok N.toPred(N.fail) {}
    _.notok N.toPred(N.fail) []
    _.notok N.toPred(N.fail) 1
    _.end()

test 'pass', (_) ->
  _.test 'works', (_) ->
    _.ok N.toPred(N.pass) ''
    _.ok N.toPred(N.pass) {}
    _.ok N.toPred(N.pass) []
    _.ok N.toPred(N.pass) 1
    _.end()

# Combinators

test 'shape', (_) ->
  _.test 'works', (_) ->
    pred = N.toPred N.shape
      foo: N.string
      bar: N.string

    _.ok pred foo: 'hello', bar: 'world'
    _.notok pred foo: 'hello', bar: 1
    _.notok pred foo: 1, bar: 'world'
    _.end()

test 'pi', (_) ->
  _.test 'works', (_) ->
    pred = N.toPred N.pi ({foo}) -> N.shape bar: N.equals foo

    _.ok pred foo: 'hello', bar: 'hello'
    _.notok pred foo: 'hello', bar: 'world'
    _.end()

test 'all', (_) ->
  _.test 'works', (_) ->
    pred = N.toPred N.all [
      N.shape foo: N.equals 'hello'
      N.shape bar: N.equals 'world'
    ]

    _.ok pred foo: 'hello', bar: 'world'
    _.notok pred foo: '', bar: 'world'
    _.notok pred foo: 'hello', bar: ''
    _.notok pred foo: '', bar: ''
    _.end()
