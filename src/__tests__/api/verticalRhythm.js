import { map } from 'ramda';
import createRhythm from '../../index';
import { UNITS } from '../../const';
import { buildConfig } from '../testHelpers/factories';
import { notNumberOrUndefined } from '../testHelpers/fixtures';

describe(`verticalRhythm()`, () => {
  describe(`with missing args`, () => {
    const rhythm = createRhythm.configure(buildConfig());
    describe(`with no args`, () => {
      it(`throws`, () => {
        expect(() => rhythm.verticalRhythm()).toThrow(
          `[cssjs-rhythm] verticalRhythm() Object Invalid: Object was missing required key(s): ['unit']`
        );
      });
    });
  });

  describe(`with invalid args`, () => {
    const rhythm = createRhythm.configure(buildConfig());
    describe.only(`with invalid arg 'unit'`, () => {
      map(invalidValue => {
        expect(() => rhythm.verticalRhythm(invalidValue)).toThrow(
          `[cssjs-rhythm] verticalRhythm() You supplied invalid Arguments: Argument 'unit': Wasn't a valid Number`
        );
      })(notNumberOrUndefined);
    });
  });

  describe(`with valid args`, () => {
    describe(`with minimum configuration`, () => {
      const rhythm = createRhythm.configure(buildConfig());

      it(`returns the correct vertical rhythm`, () => {
        expect(rhythm.verticalRhythm(1)).toEqual(`1.25rem`);
      });
    });

    describe(`with custom configuration`, () => {
      describe(`configured 'rootFontSize'`, () => {
        const rhythm = createRhythm.configure(
          buildConfig({ rootFontSize: 10 })
        );

        it(`returns the correct vertical rhythm`, () => {
          expect(rhythm.verticalRhythm(1)).toEqual(`2rem`);
        });
      });

      describe(`configured 'rhythm'`, () => {
        const rhythm = createRhythm.configure(buildConfig({ rhythm: 40 }));
        it(`returns the correct vertical rhythm`, () => {
          expect(rhythm.verticalRhythm(1)).toEqual(`2.5rem`);
        });
      });

      describe(`configured 'renderUnit'`, () => {
        const rhythm = createRhythm.configure(
          buildConfig({ renderUnit: UNITS.PX })
        );
        it(`returns the correct vertical rhythm`, () => {
          expect(rhythm.verticalRhythm(1)).toEqual(`20px`);
        });
      });

      describe(`configured 'opticalAdjustment'`, () => {
        const rhythm = createRhythm.configure(
          buildConfig({ opticalAdjustment: 0.05 })
        );

        it(`returns the correct vertical rhythm`, () => {
          expect(rhythm.verticalRhythm(1)).toEqual(`1.25rem`);
        });
      });

      describe(`configured 'horizontalRhythm' and 'verticalRhythm'`, () => {
        const rhythm = createRhythm.configure(
          buildConfig({ verticalRhythm: 30, horizontalRhythm: 40 })
        );

        it(`returns the correct vertical rhythm`, () => {
          expect(rhythm.verticalRhythm(1)).toEqual(`1.875rem`);
        });
      });
    });
  });

  describe(`vr`, () => {
    const rhythm = createRhythm.configure(buildConfig());
    it(`is aliased to 'verticalRhythm'`, () => {
      expect(rhythm.vr).toBe(rhythm.verticalRhythm);
    });
  });
});
