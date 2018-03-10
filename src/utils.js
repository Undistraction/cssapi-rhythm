import {
  compose,
  join,
  equals,
  complement,
  isEmpty,
  both,
  anyPass,
  reject,
  prop,
  addIndex,
  reduce,
  defaultTo,
  isNil,
  pickBy,
} from 'ramda'
import {
  isArray,
  isString,
  isUndefined,
  appendFlipped,
  isNotUndefined,
} from 'ramda-adjunct'
import { VALIDATOR_UID_PREFIX } from './const'

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

export const isEmptyArray = both(isArray, isEmpty)
export const isEmptyString = both(isString, isEmpty)

// -----------------------------------------------------------------------------
// String
// -----------------------------------------------------------------------------

export const joinDefined = s => v => {
  const remaining = reject(anyPass([isNil, isEmptyArray, isUndefined]))(v)
  return join(s, remaining)
}

export const joinWithComma = joinDefined(`, `)
export const joinWithColon = joinDefined(`: `)
export const joinWithSpace = joinDefined(` `)
export const joinWithFullStop = joinDefined(`.`)

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

export const isZero = equals(0)
export const isNotZero = complement(isZero)

// -----------------------------------------------------------------------------
// Lists
// -----------------------------------------------------------------------------

export const reduceIndexed = addIndex(reduce)

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export const propValue = prop(`value`)

export const defaultToEmptyObj = defaultTo({})

// -----------------------------------------------------------------------------
// Validations
// -----------------------------------------------------------------------------

export const toUID = compose(
  joinWithFullStop,
  appendFlipped(VALIDATOR_UID_PREFIX)
)

// ---------------------------------------------------------------------------
// Other
// ---------------------------------------------------------------------------

export const pickIsNotUndefined = pickBy(isNotUndefined)
