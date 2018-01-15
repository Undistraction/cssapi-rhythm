import {
  reduce,
  assoc,
  always,
  pluck,
  join,
  filter,
  has,
  compose,
  map,
  prop,
  equals,
  complement,
} from 'ramda';
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

const hasIsRequiredKey = has(`isRequired`);
const pluckName = pluck(`name`);
const propName = prop(`name`);

export const configKeys = always(pluckName(CONFIG));
export const requiredConfigKeys = always(
  compose(map(propName), filter(hasIsRequiredKey))(CONFIG)
);

export const configValidatorsMap = always(
  reduce((acc, { name, validator }) => assoc(name, validator, acc), {})(CONFIG)
);

export const joinWithSpace = join(` `);
export const joinWithComma = join(`, `);

export const isZero = equals(0);
export const isNotZero = complement(isZero);
