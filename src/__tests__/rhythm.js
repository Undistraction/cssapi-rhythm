import { merge } from 'ramda';
import rhythm from '../index';
import { UNITS } from '../const';

const minimalValidConfig = {
  rhythm: 20,
};

const buildConfig = (config = {}) => merge(minimalValidConfig, config);

describe(`rhythm`, () => {
  describe(`configure()`, () => {
    describe(`with no arguments`, () => {
      it(`throws`, () => {
        expect(() => rhythm.configure()).toThrow(
          `The config object was invalid: Object Invalid: You must supply either a 'rhythm' or both a 'horizontalRhythm' and a 'verticalRhythm'`
        );
      });
    });

    describe(`with an invalid argument`, () => {
      it(`throws`, () => {
        const value = `x`;
        expect(() => rhythm.configure(value)).toThrow(
          `The config object was invalid: Wasn't type: 'Object'`
        );
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

    describe(`api`, () => {
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
    });
  });

  describe(`with custom config values`, () => {
    describe(`'rootFontSize'`, () => {
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

    describe(`'rhythm'`, () => {
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
    describe(`'renderUnit'`, () => {
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
    describe(`'opticalAdjustment'`, () => {
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
          it(`returns four values in the correct order`, () => {
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
  });
});
