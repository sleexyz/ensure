# @sleexyz/ensure

This library provides combinators for constructing compositional validation schemas.

**WIP don't use :p**


## Quick Start

```
import N from '@sleexyz/ensure'

const ensureValidAPI = N.shape({
  foo: N.string
  bar: N.string
});

console.log(N.toPred(ensureValidAPI)({
  foo: "hello",
  bar: "world"
)); // true

console.log(N.toPred(ensureValidAPI)({
  foo: "hello",
  bar: null
));  // false

```

## Guide

Schemas are simply functions that return nothing on validation success and throw an error on validation failure.
This means one can sprinkle them into your code for runtime assertions:
```
import N from '@sleexyz/ensure'
...
const foo = "hello";
N.string(foo)
...
```

## Conversions

`N` provides conversions between different representations:

#### `N.toPred` : Schema -> Predicate

#### `N.toPromise` : Schema -> Promise

#### `N.fromPred` : (Predicate, errorMessage?: String) -> Schema
