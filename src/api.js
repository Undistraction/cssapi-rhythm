import { compose, partial } from 'ramda';
import { outputWithUnit } from 'cssjs-units';
import { joinWithSpace, isZero } from './utils';

export default config => {
  const { rhythm, opticalAdjustment, rootFontSize, renderUnit } = config;

  const verticalRhythm = v => v * rhythm;
  const horizontalRhythm = v => v * (1 - opticalAdjustment) * rhythm;
  const toOutputValue = partial(outputWithUnit, [renderUnit, rootFontSize]);
  const output = calculateRhythm => compose(toOutputValue, calculateRhythm);
  const outputVerticalRhythm = output(verticalRhythm);
  const outputHorizontalRhythm = output(horizontalRhythm);

  const multi = (...args) => {
    switch (args.length) {
      case 1:
        return isZero(opticalAdjustment)
          ? outputVerticalRhythm(args[0])
          : joinWithSpace([
              outputVerticalRhythm(args[0]),
              outputHorizontalRhythm(args[0]),
            ]);
      case 2:
        return joinWithSpace([
          outputVerticalRhythm(args[0]),
          outputHorizontalRhythm(args[1]),
        ]);
      case 3:
        return joinWithSpace([
          outputVerticalRhythm(args[0]),
          outputHorizontalRhythm(args[1]),
          outputVerticalRhythm(args[2]),
        ]);
      case 4:
        return joinWithSpace([
          outputVerticalRhythm(args[0]),
          outputHorizontalRhythm(args[1]),
          outputVerticalRhythm(args[2]),
          outputHorizontalRhythm(args[3]),
        ]);
      default:
    }
  };

  return {
    vr: outputVerticalRhythm,
    hr: outputHorizontalRhythm,
    r: multi,
  };
};
