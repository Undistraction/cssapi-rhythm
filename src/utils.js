import { join, equals, complement } from 'ramda';

export const joinWithSpace = join(` `);
export const joinWithComma = join(`, `);

export const isZero = equals(0);
export const isNotZero = complement(isZero);
