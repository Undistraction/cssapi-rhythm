import { map } from 'ramda';
import createRhythm from '../index';
import { buildConfig } from './testHelpers/factories';
import { notObject } from './testHelpers/fixtures';

describe(`configuration rhythm()`, () => {
  describe(`with no config`, () => {
    it(`throws`, () => {
      expect(() => createRhythm()).toThrow(
        `[cssapi-rhythm] configure::config Wasn't Plain Object`
      );
    });
  });

  describe(`with an non-object`, () => {
    it(`throws`, () => {
      map(invalidValue => {
        expect(() => createRhythm(invalidValue)).toThrow(
          `[cssapi-rhythm] configure::config Wasn't Plain Object`
        );
      }, notObject);
    });
  });

  describe(`with invalid config param names`, () => {
    it(`throws`, () => {
      const value = buildConfig({ a: 1, b: 2 });
      expect(() =>
        createRhythm(value)
      ).toThrowMatchingErrorWithCompressedWhitespace(
        `[cssapi-rhythm] configure::config Object
          – included key(s) not on whitelist: ['rootFontSize', 'rhythm', 'horizontalRhythm', 'verticalRhythm', 'renderUnit', 'opticalAdjustment']`
      );
    });
  });

  describe(`with invalid config param values`, () => {
    it(`throws`, () => {
      const value = { renderUnit: `a`, rhythm: `b` };
      expect(() =>
        createRhythm(value)
      ).toThrowMatchingErrorWithCompressedWhitespace(
        `[cssapi-rhythm] configure::config Object 
          – included invalid value(s)
            – Key 'renderUnit': Value wasn't on the whitelist: ['rem', 'em', 'px']
            – Key 'rhythm': Wasn't Valid Number or Wasn't number with unit: 'px'`
      );
    });
  });

  describe(`combinations of 'rhythm', 'horizontalRhythm', 'verticalRhythm' and 'opticalAdjustment'`, () => {
    describe(`with only 'horizontalRhythm' set`, () => {
      it(`throws`, () => {
        expect(() =>
          createRhythm({ horizontalRhythm: 20 })
        ).toThrowMatchingErrorWithCompressedWhitespace(
          `[cssapi-rhythm] configure::config Object
            – You must supply either a 'rhythm' or both 'hRhythm' and 'vRhythm' values`
        );
      });
    });

    describe(`with only 'verticalRhythm' set`, () => {
      it(`throws`, () => {
        expect(() =>
          createRhythm({ verticalRhythm: 20 })
        ).toThrowMatchingErrorWithCompressedWhitespace(
          `[cssapi-rhythm] configure::config Object
            – You must supply either a 'rhythm' or both 'hRhythm' and 'vRhythm' values`
        );
      });
    });

    describe(`with 'rhythm', 'horizontalRhythm' and 'verticalRhythm' set`, () => {
      it(`ignores the value of 'rhythm'`, () => {
        const rtm = createRhythm({
          verticalRhythm: 20,
          horizontalRhythm: 30,
          rhythm: 10,
        });
        expect(rtm.rhythm(1)).toEqual(`1.25rem 1.875rem`);
      });
    });

    describe(`with 'rhythm' and 'horizontalRhythm' set`, () => {
      it(`uses the value of 'rhythm' for vertical and 'horizontalRhythm' for horizontal`, () => {
        const rtm = createRhythm({
          horizontalRhythm: 30,
          rhythm: 10,
        });
        expect(rtm.rhythm(1)).toEqual(`0.625rem 1.875rem`);
      });
    });

    describe(`with 'rhythm' and 'verticalRhythm' set`, () => {
      it(`uses the value of 'rhythm' for horizontal and 'horizontalRhythm' for vertical`, () => {
        const rtm = createRhythm({
          verticalRhythm: 30,
          rhythm: 10,
        });
        expect(rtm.rhythm(1)).toEqual(`1.875rem 0.625rem`);
      });
    });

    describe(`with 'rhythm', 'horizontalRhythm', 'verticalRhythm' and 'opticalAdjustment' set`, () => {
      it(`ignores the value of 'rhythm' and 'adjustment`, () => {
        const rtm = createRhythm({
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
        const rtm = createRhythm({
          horizontalRhythm: 30,
          rhythm: 10,
          opticalAdjustment: 0.7,
        });
        expect(rtm.rhythm(1)).toEqual(`0.625rem 1.875rem`);
      });
    });

    describe(`with 'rhythm', 'verticalRhythm' and 'opticalAdjustment' set`, () => {
      it(`uses the value of 'rhythm' for vertical and 'verticalRhythm' for horizontal and ignores 'opticalAdjustment`, () => {
        const rtm = createRhythm({
          verticalRhythm: 30,
          rhythm: 10,
          opticalAdjustment: 0.7,
        });
        expect(rtm.rhythm(1)).toEqual(`1.875rem 0.625rem`);
      });
    });
  });
});
