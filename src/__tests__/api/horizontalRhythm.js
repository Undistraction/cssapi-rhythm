import { map } from 'ramda';
import createRhythm from '../../index';
import { UNITS } from '../../const';
import { buildConfig } from '../testHelpers/factories';
import { notNumberOrUndefined } from '../testHelpers/fixtures';

describe(`horizontalRhythm()`, () => {
  describe(`with missing args`, () => {
    const rhythm = createRhythm(buildConfig());
    describe(`with no args`, () => {
      it(`throws`, () => {
        expect(() => rhythm.horizontalRhythm()).toThrow(
          `[cssjs-rhythm] horizontalRhythm() Object Invalid: Object was missing required key(s): ['unit']`
        );
      });
    });
  });

  describe(`with invalid args`, () => {
    const rhythm = createRhythm(buildConfig());
    describe(`with invalid arg 'units'`, () => {
      map(invalidValue => {
        expect(() => rhythm.horizontalRhythm(invalidValue)).toThrow(
          `[cssjs-rhythm] horizontalRhythm() You supplied invalid Arguments: Argument 'unit': Wasn't a valid Number`
        );
      })(notNumberOrUndefined);
    });
  });

  describe(`with valid args`, () => {
    describe(`with minimum configuration`, () => {
      const rhythm = createRhythm(buildConfig());

      it(`returns the correct horizontal rhythm`, () => {
        expect(rhythm.horizontalRhythm(1)).toEqual(`1.25rem`);
      });
    });

    describe(`with custom configuration`, () => {
      describe(`'rootFontSize'`, () => {
        const rhythm = createRhythm(buildConfig({ rootFontSize: 10 }));

        it(`returns the correct horizontal rhythm`, () => {
          expect(rhythm.horizontalRhythm(1)).toEqual(`2rem`);
        });
      });

      describe(`'rhythm'`, () => {
        const rhythm = createRhythm(buildConfig({ rhythm: 40 }));
        describe(`hr`, () => {
          it(`returns the correct horizontal rhythm`, () => {
            expect(rhythm.horizontalRhythm(1)).toEqual(`2.5rem`);
          });
        });
      });

      describe(`'renderUnit'`, () => {
        const rhythm = createRhythm(buildConfig({ renderUnit: UNITS.PX }));

        it(`returns the correct horizontal rhythm`, () => {
          expect(rhythm.horizontalRhythm(1)).toEqual(`20px`);
        });
      });

      describe(`'opticalAdjustment'`, () => {
        const rhythm = createRhythm(buildConfig({ opticalAdjustment: 0.05 }));

        it(`returns the correct horizontal rhythm`, () => {
          expect(rhythm.horizontalRhythm(1)).toEqual(`1.1875rem`);
        });
      });

      describe(`'horizontalRhythm' and 'verticalRhythm'`, () => {
        const rhythm = createRhythm(
          buildConfig({ verticalRhythm: 30, horizontalRhythm: 40 })
        );

        it(`returns the correct horizontal rhythm`, () => {
          expect(rhythm.horizontalRhythm(1)).toEqual(`2.5rem`);
        });
      });
    });
  });

  describe(`hr`, () => {
    const rhythm = createRhythm(buildConfig());

    it(`is aliased to 'horizontalRhythm'`, () => {
      expect(rhythm.hr).toBe(rhythm.horizontalRhythm);
    });
  });
});
