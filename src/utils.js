import {
  join,
  equals,
  complement,
  isEmpty,
  both,
  anyPass,
  reject,
  flip,
  append,
  prop,
  replace,
  addIndex,
  reduce,
  compose,
  defaultTo,
} from 'ramda';
import { isArray, isString, isUndefined } from 'ramda-adjunct';

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

export const isEmptyArray = both(isArray, isEmpty);
export const isEmptyString = both(isString, isEmpty);

// -----------------------------------------------------------------------------
// String
// -----------------------------------------------------------------------------

export const joinDefined = s => v => {
  const remaining = reject(anyPass([isEmptyString, isEmptyArray, isUndefined]))(
    v
  );
  const result = join(s, remaining);
  return result;
};

export const joinWithComma = joinDefined(`, `);
export const joinWithSpace = joinDefined(` `);

// -----------------------------------------------------------------------------
// Predicates
// -----------------------------------------------------------------------------

export const isZero = equals(0);
export const isNotZero = complement(isZero);

// -----------------------------------------------------------------------------
// Lists
// -----------------------------------------------------------------------------

export const appendTo = flip(append);
export const reduceIndexed = addIndex(reduce);

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export const propValue = prop(`value`);

export const defaultToEmptyObj = defaultTo({});
