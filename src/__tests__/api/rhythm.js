import { map } from 'ramda';
import createRhythm from '../../index';
import { UNITS } from '../../const';
import { buildConfig } from '../testHelpers/factories';
import { notNumberOrUndefined } from '../testHelpers/fixtures';

describe(`rhythm()`, () => {
  describe(`with missing args`, () => {
    const rhythm = createRhythm(buildConfig());
    describe(`with no args`, () => {
      it(`throws`, () => {
        expect(() => rhythm.rhythm()).toThrow(
          `[cssjs-rhythm] rhythm() Object Invalid: Object was missing required key(s): ['arg1']`
        );
      });
    });
  });

  describe(`with invalid args`, () => {
    const rhythm = createRhythm(buildConfig());
    describe(`first arg`, () => {
      map(invalidValue => {
        expect(() => rhythm.rhythm(invalidValue)).toThrow(
          `[cssjs-rhythm] rhythm() You supplied invalid Arguments: Argument 'arg1': Wasn't a valid Number`
        );
      })(notNumberOrUndefined);
    });

    describe(`second arg`, () => {
      map(invalidValue => {
        expect(() => rhythm.rhythm(1, invalidValue)).toThrow(
          `[cssjs-rhythm] rhythm() You supplied invalid Arguments: Argument 'arg2': Wasn't a valid Number`
        );
      })(notNumberOrUndefined);
    });

    describe(`third arg`, () => {
      map(invalidValue => {
        expect(() => rhythm.rhythm(1, 2, invalidValue)).toThrow(
          `[cssjs-rhythm] rhythm() You supplied invalid Arguments: Argument 'arg3': Wasn't a valid Number`
        );
      })(notNumberOrUndefined);
    });

    describe(`fourth arg`, () => {
      map(invalidValue => {
        expect(() => rhythm.rhythm(1, 2, 3, invalidValue)).toThrow(
          `[cssjs-rhythm] rhythm() You supplied invalid Arguments: Argument 'arg4': Wasn't a valid Number`
        );
      })(notNumberOrUndefined);
    });

    describe(`unsupported fifth arg`, () => {
      map(invalidValue => {
        expect(() => rhythm.rhythm(1, 2, 3, 4, invalidValue)).toThrow(
          `[cssjs-rhythm] rhythm() Object Invalid: Object included invalid key(s): '[arg5]'`
        );
      })(notNumberOrUndefined);
    });
  });

  describe(`with valid args`, () => {
    describe(`with minimum configuration`, () => {
      const rhythm = createRhythm(buildConfig());

      describe(`for a single value`, () => {
        it(`returns two values in the correct order`, () => {
          expect(rhythm.rhythm(1)).toEqual(`1.25rem`);
        });
      });

      describe(`for a 2 values`, () => {
        it(`returns two values in the correct order`, () => {
          expect(rhythm.rhythm(1, 2)).toEqual(`1.25rem 2.5rem`);
        });
      });

      describe(`for a 3 values`, () => {
        it(`returns four values in the correct order`, () => {
          expect(rhythm.rhythm(1, 2, 3)).toEqual(`1.25rem 2.5rem 3.75rem`);
        });
      });

      describe(`for a 4 values`, () => {
        it(`returns four values in the correct order`, () => {
          expect(rhythm.rhythm(1, 2, 3, 4)).toEqual(
            `1.25rem 2.5rem 3.75rem 5rem`
          );
        });
      });
    });

    describe(`with custom configuration`, () => {
      describe(`configured 'rootFontSize'`, () => {
        const rhythm = createRhythm(buildConfig({ rootFontSize: 10 }));

        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rhythm.rhythm(1)).toEqual(`2rem`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rhythm.rhythm(2, 2)).toEqual(`4rem 4rem`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rhythm.rhythm(1, 1, 3)).toEqual(`2rem 2rem 6rem`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rhythm.rhythm(2, 1, 3, 4)).toEqual(`4rem 2rem 6rem 8rem`);
          });
        });
      });

      describe(`configured 'rhythm'`, () => {
        const rhythm = createRhythm(buildConfig({ rhythm: 40 }));

        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rhythm.rhythm(1)).toEqual(`2.5rem`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rhythm.rhythm(2, 2)).toEqual(`5rem 5rem`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rhythm.rhythm(1, 1, 3)).toEqual(`2.5rem 2.5rem 7.5rem`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rhythm.rhythm(2, 1, 3, 4)).toEqual(
              `5rem 2.5rem 7.5rem 10rem`
            );
          });
        });
      });

      describe(`configured 'renderUnit'`, () => {
        const rhythm = createRhythm(buildConfig({ renderUnit: UNITS.PX }));

        describe(`for a single value`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rhythm.rhythm(1)).toEqual(`20px`);
          });
        });

        describe(`for a 2 values`, () => {
          it(`returns two values in the correct order`, () => {
            expect(rhythm.rhythm(2, 2)).toEqual(`40px 40px`);
          });
        });

        describe(`for a 3 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rhythm.rhythm(1, 1, 3)).toEqual(`20px 20px 60px`);
          });
        });

        describe(`for a 4 values`, () => {
          it(`returns four values in the correct order`, () => {
            expect(rhythm.rhythm(2, 1, 3, 4)).toEqual(`40px 20px 60px 80px`);
          });
        });
      });
    });
  });

  describe(`r`, () => {
    const rhythm = createRhythm(buildConfig());
    it(`is aliased to 'rhythm'`, () => {
      expect(rhythm.r).toBe(rhythm.rhythm);
    });
  });
});
