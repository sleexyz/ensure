# refinement

Combinatory Data Refinement DSL

**WIP don't use :p**


## Quick Start

```
import R from 'refinement'

const ensureValidAPI = R.shape({
  foo: R.string
  bar: R.string
});

console.log(R.toPred(ensureValidAPI)({
  foo: "hello",
  bar: "world"
)); // true

console.log(R.toPred(ensureValidAPI)({
  foo: "hello",
  bar: null
));  // false

```

## Guide

```
import R from 'refinement'

// ...

const foo = "hello";
R.string(foo)

// ...
```

## Conversions

`R` provides conversions between different representations:

#### `R.toPred` : Schema -> Predicate

#### `R.toPromise` : Schema -> Promise

#### `R.fromPred` : (Predicate, errorMessage?: String) -> Schema
