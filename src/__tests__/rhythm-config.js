import { map } from 'ramda';
import rhythm from '../index';
import { buildConfig } from './testHelpers/factories';
import { notObject } from './testHelpers/fixtures';

describe(`configuration rhythm()`, () => {
  describe(`with no config`, () => {
    it(`throws`, () => {
      expect(() => rhythm.configure()).toThrow(
        `The config object was invalid: Wasn't type: 'Object'`
      );
    });
  });

  describe(`with an non-object`, () => {
    it(`throws`, () => {
      map(invalidValue => {
        expect(() => rhythm.configure(invalidValue)).toThrow(
          `The config object was invalid: Wasn't type: 'Object'`
        );
      }, notObject);
    });
  });

  describe(`with invalid config param names`, () => {
    it(`throws`, () => {
      const value = buildConfig({ a: 1, b: 2 });
      expect(() => rhythm.configure(value)).toThrow(
        `The config object was invalid: Object Invalid: Object included invalid key(s): '[a, b]`
      );
    });
  });

  describe(`with invalid config param keys`, () => {
    it(`throws`, () => {
      const value = { renderUnit: `100%`, rhythm: `x` };
      expect(() => rhythm.configure(value)).toThrow(
        `The config object was invalid: Object Invalid: Object included invalid values(s): Key 'renderUnit': Value wasn't one of the accepted values: rem, em, px, Key 'rhythm': Wasn't a valid Number and Wasn't number with unit: 'px'`
      );
    });
  });
});
