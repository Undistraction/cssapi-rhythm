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

  describe(`with invalid config param values`, () => {
    it(`throws`, () => {
      const value = { renderUnit: `100%`, rhythm: `x` };
      expect(() => rhythm.configure(value)).toThrow(
        `The config object was invalid: Object Invalid: Object included invalid values(s): Key 'renderUnit': Value wasn't one of the accepted values: rem, em, px, Key 'rhythm': Wasn't a valid Number and Wasn't number with unit: 'px'`
      );
    });
  });

  describe(`combinations of 'rhythm', 'horizontalRhythm', 'verticalRhythm' and 'opticalAdjustment'`, () => {
    describe(`with only 'horizontalRhythm' set`, () => {
      it(`throws`, () => {
        expect(() => rhythm.configure({ horizontalRhythm: 20 })).toThrow(
          `The config object was invalid: Object Invalid: You must supply either a 'rhythm' or both a 'horizontalRhythm' and a 'verticalRhythm'`
        );
      });
    });

    describe(`with only 'verticalRhythm' set`, () => {
      it(`throws`, () => {
        expect(() => rhythm.configure({ verticalRhythm: 20 })).toThrow(
          `The config object was invalid: Object Invalid: You must supply either a 'rhythm' or both a 'horizontalRhythm' and a 'verticalRhythm'`
        );
      });
    });

    describe(`with 'rhythm', 'horizontalRhythm' and 'verticalRhythm' set`, () => {
      it(`ignores the value of 'rhythm'`, () => {
        const rtm = rhythm.configure({
          verticalRhythm: 20,
          horizontalRhythm: 30,
          rhythm: 10,
        });
        expect(rtm.rhythm(1)).toEqual(`1.25rem 1.875rem`);
      });
    });

    describe(`with 'rhythm' and 'horizontalRhythm' set`, () => {
      it(`uses the value of 'rhythm' for vertical and 'horizontalRhythm' for horizontal`, () => {
        const rtm = rhythm.configure({
          horizontalRhythm: 30,
          rhythm: 10,
        });
        expect(rtm.rhythm(1)).toEqual(`0.625rem 1.875rem`);
      });
    });

    describe(`with 'rhythm' and 'verticalRhythm' set`, () => {
      it(`uses the value of 'rhythm' for horizontal and 'horizontalRhythm' for vertical`, () => {
        const rtm = rhythm.configure({
          verticalRhythm: 30,
          rhythm: 10,
        });
        expect(rtm.rhythm(1)).toEqual(`1.875rem 0.625rem`);
      });
    });

    describe(`with 'rhythm', 'horizontalRhythm', 'verticalRhythm' and 'opticalAdjustment' set`, () => {
      it(`ignores the value of 'rhythm' and 'adjustment`, () => {
        const rtm = rhythm.configure({
          verticalRhythm: 20,
          horizontalRhythm: 30,
          rhythm: 10,
          opticalAdjustment: 0.7,
        });
        expect(rtm.rhythm(1)).toEqual(`1.25rem 1.875rem`);
      });
    });

    describe(`with 'rhythm', 'horizontalRhythm' and 'opticalAdjustment' set`, () => {
      it(`uses the value of 'rhythm' for vertical and 'horizontalRhythm' for horizontal and ignores 'opticalAdjustment`, () => {
        const rtm = rhythm.configure({
          horizontalRhythm: 30,
          rhythm: 10,
          opticalAdjustment: 0.7,
        });
        expect(rtm.rhythm(1)).toEqual(`0.625rem 1.875rem`);
      });
    });

    describe(`with 'rhythm', 'verticalRhythm' and 'opticalAdjustment' set`, () => {
      it(`uses the value of 'rhythm' for vertical and 'verticalRhythm' for horizontal and ignores 'opticalAdjustment`, () => {
        const rtm = rhythm.configure({
          verticalRhythm: 30,
          rhythm: 10,
          opticalAdjustment: 0.7,
        });
        expect(rtm.rhythm(1)).toEqual(`1.875rem 0.625rem`);
      });
    });
  });
});
