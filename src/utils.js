import { reduce, assoc, join, equals, complement } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { CONFIG } from './constraints';

export const getDefaultConfig = _ =>
  reduce(
    (acc, value) =>
      isNotUndefined(value.default)
        ? assoc(value.name, value.default, acc)
        : acc,
    {},
    CONFIG
  );

export const joinWithSpace = join(` `);
export const joinWithComma = join(`, `);

export const isZero = equals(0);
export const isNotZero = complement(isZero);
