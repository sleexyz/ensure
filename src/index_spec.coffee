N = require './'
assert = require 'assert'

pass = (cont) -> cont()
fail = (cont) -> assert.throws cont


describe 'predicates', ->
  describe 'fail', ->
    it 'works', ->
      fail -> N.fail ''
      fail -> N.fail {}
      fail -> N.fail []
      fail -> N.fail 1

  describe 'pass', ->
    it 'works', ->
      pass -> N.pass ''
      pass -> N.pass {}
      pass -> N.pass []
      pass -> N.pass 1

  describe 'string',  ->
    it 'works', ->
      pass -> N.string 'asdf'
      pass -> N.string ''
      fail -> N.string 1
      fail -> N.string {}
      fail -> N.string []

describe 'combinators', ->
  describe 'shape', ->
    it 'works', ->
      check = N.shape
        foo: N.string
        bar: N.string

      pass -> check foo: 'hello', bar: 'world'
      fail -> check foo: 'hello', bar: 1
      fail -> check foo: 1, bar: 'world'

  describe 'pi', ->
    it 'works', ->
      check = N.pi ({foo}) -> N.shape bar: N.equals foo
      pass -> check foo: 'hello', bar: 'hello'
      fail -> check foo: 'hello', bar: 'world'

  describe 'all', ->
    it 'works', ->
      check = N.all [
        N.shape foo: N.equals 'hello'
        N.shape bar: N.equals 'world'
      ]

      pass -> check foo: 'hello', bar: 'world'
      fail -> check foo: '', bar: 'world'
      fail -> check foo: 'hello', bar: ''
      fail -> check foo: '', bar: ''
