import rhythm from '../index';
import { UNITS } from '../const';
import { buildConfig } from './testHelpers/factories';

describe(`api rhythm()()`, () => {
  describe(`with minimum configuration`, () => {
    const config = buildConfig();
    const rtm = rhythm.configure(config);

    describe(`vr`, () => {
      it(`returns the correct vertical rhythm`, () => {
        expect(rtm.vr(1)).toEqual(`1.25rem`);
      });
    });

    describe(`hr`, () => {
      it(`returns the correct horizontal rhythm`, () => {
        expect(rtm.hr(1)).toEqual(`1.25rem`);
      });
    });

    describe(`r`, () => {
      describe(`for a single value`, () => {
        it(`returns two values in the correct order`, () => {
          expect(rtm.r(1)).toEqual(`1.25rem`);
        });
      });

      describe(`for a 2 values`, () => {
        it(`returns two values in the correct order`, () => {
          expect(rtm.r(1, 2)).toEqual(`1.25rem 2.5rem`);
        });
      });

      describe(`for a 3 values`, () => {
        it(`returns four values in the correct order`, () => {
          expect(rtm.r(1, 2, 3)).toEqual(`1.25rem 2.5rem 3.75rem`);
        });
      });

      describe(`for a 4 values`, () => {
        it(`returns four values in the correct order`, () => {
          expect(rtm.r(1, 2, 3, 4)).toEqual(`1.25rem 2.5rem 3.75rem 5rem`);
        });
      });
    });
  });

  describe(`with custom configuration`, () => {
    describe(`configured 'rootFontSize'`, () => {
      const rtm = rhythm.configure(buildConfig({ rootFontSize: 10 }));

      describe(`vr`, () => {
        it(`returns the correct vertical rhythm`, () => {
          expect(rtm.vr(1)).toEqual(`2rem`);
        });
      });

      describe(`hr`, () => {
        it(`returns the correct horizontal rhythm`, () => {
          expect(rtm.hr(1)).toEqual(`2rem`);
        });
      });

      describe(`r`, () => {
        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(1)).toEqual(`2rem`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(2, 2)).toEqual(`4rem 4rem`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(1, 1, 3)).toEqual(`2rem 2rem 6rem`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(2, 1, 3, 4)).toEqual(`4rem 2rem 6rem 8rem`);
          });
        });
      });
    });

    describe(`configured 'rhythm'`, () => {
      const rtm = rhythm.configure(buildConfig({ rhythm: 40 }));
      describe(`vr`, () => {
        it(`returns the correct vertical rhythm`, () => {
          expect(rtm.vr(1)).toEqual(`2.5rem`);
        });
      });

      describe(`hr`, () => {
        it(`returns the correct horizontal rhythm`, () => {
          expect(rtm.hr(1)).toEqual(`2.5rem`);
        });
      });

      describe(`r`, () => {
        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(1)).toEqual(`2.5rem`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(2, 2)).toEqual(`5rem 5rem`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(1, 1, 3)).toEqual(`2.5rem 2.5rem 7.5rem`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(2, 1, 3, 4)).toEqual(`5rem 2.5rem 7.5rem 10rem`);
          });
        });
      });
    });

    describe(`configured 'renderUnit'`, () => {
      const rtm = rhythm.configure(buildConfig({ renderUnit: UNITS.PX }));
      describe(`vr`, () => {
        it(`returns the correct vertical rhythm`, () => {
          expect(rtm.vr(1)).toEqual(`20px`);
        });
      });

      describe(`hr`, () => {
        it(`returns the correct horizontal rhythm`, () => {
          expect(rtm.hr(1)).toEqual(`20px`);
        });
      });

      describe(`r`, () => {
        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(1)).toEqual(`20px`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(2, 2)).toEqual(`40px 40px`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(1, 1, 3)).toEqual(`20px 20px 60px`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(2, 1, 3, 4)).toEqual(`40px 20px 60px 80px`);
          });
        });
      });
    });
    describe(`configured 'opticalAdjustment'`, () => {
      const rtm = rhythm.configure(buildConfig({ opticalAdjustment: 0.05 }));
      describe(`vr`, () => {
        it(`returns the correct vertical rhythm`, () => {
          expect(rtm.vr(1)).toEqual(`1.25rem`);
        });
      });

      describe(`hr`, () => {
        it(`returns the correct horizontal rhythm`, () => {
          expect(rtm.hr(1)).toEqual(`1.1875rem`);
        });
      });

      describe(`r`, () => {
        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(1)).toEqual(`1.25rem 1.1875rem`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(2, 2)).toEqual(`2.5rem 2.375rem`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns three values in the correct order`, () => {
            expect(rtm.r(1, 1, 3)).toEqual(`1.25rem 1.1875rem 3.75rem`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(2, 1, 3, 4)).toEqual(
              `2.5rem 1.1875rem 3.75rem 4.75rem`
            );
          });
        });
      });
    });

    describe(`configured 'horizontalRhythm' and 'verticalRhythm'`, () => {
      const rtm = rhythm.configure(
        buildConfig({ verticalRhythm: 30, horizontalRhythm: 40 })
      );
      describe(`vr`, () => {
        it(`returns the correct vertical rhythm`, () => {
          expect(rtm.vr(1)).toEqual(`1.875rem`);
        });
      });

      describe(`hr`, () => {
        it(`returns the correct horizontal rhythm`, () => {
          expect(rtm.hr(1)).toEqual(`2.5rem`);
        });
      });

      describe(`r`, () => {
        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(1)).toEqual(`1.875rem 2.5rem`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rtm.r(2, 2)).toEqual(`3.75rem 5rem`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns three values in the correct order`, () => {
            expect(rtm.r(1, 1, 3)).toEqual(`1.875rem 2.5rem 5.625rem`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rtm.r(2, 1, 3, 4)).toEqual(`3.75rem 2.5rem 5.625rem 10rem`);
          });
        });
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
          expect(rtm.r(1)).toEqual(`1.25rem 1.875rem`);
        });
      });

      describe(`with 'rhythm' and 'horizontalRhythm' set`, () => {
        it(`uses the value of 'rhythm' for vertical and 'horizontalRhythm' for horizontal`, () => {
          const rtm = rhythm.configure({
            horizontalRhythm: 30,
            rhythm: 10,
          });
          expect(rtm.r(1)).toEqual(`0.625rem 1.875rem`);
        });
      });

      describe(`with 'rhythm' and 'verticalRhythm' set`, () => {
        it(`uses the value of 'rhythm' for horizontal and 'horizontalRhythm' for vertical`, () => {
          const rtm = rhythm.configure({
            verticalRhythm: 30,
            rhythm: 10,
          });
          expect(rtm.r(1)).toEqual(`1.875rem 0.625rem`);
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
          expect(rtm.r(1)).toEqual(`1.25rem 1.875rem`);
        });
      });

      describe(`with 'rhythm', 'horizontalRhythm' and 'opticalAdjustment' set`, () => {
        it(`uses the value of 'rhythm' for vertical and 'horizontalRhythm' for horizontal and ignores 'opticalAdjustment`, () => {
          const rtm = rhythm.configure({
            horizontalRhythm: 30,
            rhythm: 10,
            opticalAdjustment: 0.7,
          });
          expect(rtm.r(1)).toEqual(`0.625rem 1.875rem`);
        });
      });

      describe(`with 'rhythm', 'verticalRhythm' and 'opticalAdjustment' set`, () => {
        it(`uses the value of 'rhythm' for vertical and 'verticalRhythm' for horizontal and ignores 'opticalAdjustment`, () => {
          const rtm = rhythm.configure({
            verticalRhythm: 30,
            rhythm: 10,
            opticalAdjustment: 0.7,
          });
          expect(rtm.r(1)).toEqual(`1.875rem 0.625rem`);
        });
      });
    });
  });
});
