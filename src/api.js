import {
  compose,
  partial,
  multiply,
  equals,
  subtract,
  always,
  ifElse,
} from 'ramda';
import { isUndefined, defaultWhen } from 'ramda-adjunct';
import { outputWithUnit } from 'cssjs-units';
import { joinWithSpace } from './utils';

export default config => {
  const {
    rhythm,
    opticalAdjustment,
    rootFontSize,
    renderUnit,
    verticalRhythm,
    horizontalRhythm,
  } = config;

  const opticallyAdjustRhythm = multiply(subtract(1, opticalAdjustment));

  const resolvedVerticalRhythm = isUndefined(verticalRhythm)
    ? rhythm
    : verticalRhythm;

  const resolvedHorizontalRhythm = defaultWhen(
    isUndefined,
    ifElse(isUndefined, always(opticallyAdjustRhythm(rhythm)), always(rhythm))(
      verticalRhythm
    ),
    horizontalRhythm
  );

  const hasUnifiedRhythm = equals(
    resolvedVerticalRhythm,
    resolvedHorizontalRhythm
  );

  const toVerticalRhythm = multiply(resolvedVerticalRhythm);
  const toHorizontalRhythm = multiply(resolvedHorizontalRhythm);
  const toOutputValue = partial(outputWithUnit, [renderUnit, rootFontSize]);
  const outputRhythm = calculateRhythm =>
    compose(toOutputValue, calculateRhythm);
  const outputVerticalRhythm = outputRhythm(toVerticalRhythm);
  const outputHorizontalRhythm = outputRhythm(toHorizontalRhythm);

  const multi = (...args) => {
    switch (args.length) {
      case 1:
        return hasUnifiedRhythm
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
