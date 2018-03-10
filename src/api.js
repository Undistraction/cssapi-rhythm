import {
  compose,
  partial,
  multiply,
  equals,
  subtract,
  always,
  ifElse,
  assoc,
} from 'ramda'
import { isUndefined, defaultWhen } from 'ramda-adjunct'
import { outputWithUnit } from 'cssapi-units'
import { joinWithSpace, reduceIndexed, pickIsNotUndefined } from './utils'
import {
  throwAPIVerticalRhythmError,
  throwAPIHorizontalRhythmError,
  throwAPIRhythmError,
} from './errors'
import validateAPIRhythmSingleArg from './validations/validators/validateAPIRhythmSingleArg'
import validateAPIRhythmMultiArg from './validations/validators/validateAPIRhythmMultiArg'

export default config => {
  const {
    rhythm,
    opticalAdjustment,
    rootFontSize,
    renderUnit,
    verticalRhythm,
    horizontalRhythm,
  } = config

  const opticallyAdjustRhythm = multiply(subtract(1, opticalAdjustment))

  const resolvedVerticalRhythm = isUndefined(verticalRhythm)
    ? rhythm
    : verticalRhythm

  const resolvedHorizontalRhythm = defaultWhen(
    isUndefined,
    ifElse(isUndefined, always(opticallyAdjustRhythm(rhythm)), always(rhythm))(
      verticalRhythm
    ),
    horizontalRhythm
  )

  const hasUnifiedRhythm = equals(
    resolvedVerticalRhythm,
    resolvedHorizontalRhythm
  )

  const toVerticalRhythm = multiply(resolvedVerticalRhythm)
  const toHorizontalRhythm = multiply(resolvedHorizontalRhythm)
  const toOutputValue = partial(outputWithUnit, [renderUnit, rootFontSize])
  const outputRhythm = calculateRhythm =>
    compose(toOutputValue, calculateRhythm)
  const outputVerticalRhythm = outputRhythm(toVerticalRhythm)
  const outputHorizontalRhythm = outputRhythm(toHorizontalRhythm)

  const outputMultipleRhythm = (...args) => {
    switch (args.length) {
      case 1:
        return hasUnifiedRhythm
          ? outputVerticalRhythm(args[0])
          : joinWithSpace([
              outputVerticalRhythm(args[0]),
              outputHorizontalRhythm(args[0]),
            ])
      case 2:
        return joinWithSpace([
          outputVerticalRhythm(args[0]),
          outputHorizontalRhythm(args[1]),
        ])
      case 3:
        return joinWithSpace([
          outputVerticalRhythm(args[0]),
          outputHorizontalRhythm(args[1]),
          outputVerticalRhythm(args[2]),
        ])
      case 4:
        return joinWithSpace([
          outputVerticalRhythm(args[0]),
          outputHorizontalRhythm(args[1]),
          outputVerticalRhythm(args[2]),
          outputHorizontalRhythm(args[3]),
        ])
      default:
    }
    return null
  }

  const vr = unit => {
    validateAPIRhythmSingleArg(pickIsNotUndefined({ unit })).orElse(
      throwAPIVerticalRhythmError
    )
    return outputVerticalRhythm(unit)
  }

  const hr = unit => {
    validateAPIRhythmSingleArg(pickIsNotUndefined({ unit })).orElse(
      throwAPIHorizontalRhythmError
    )
    return outputHorizontalRhythm(unit)
  }

  const r = (...args) => {
    // Add args to object
    const o = reduceIndexed(
      (acc, v, i) => assoc(`arg${i + 1}`, v, acc),
      {},
      args
    )
    validateAPIRhythmMultiArg(o).orElse(throwAPIRhythmError)
    return outputMultipleRhythm(...args)
  }

  return {
    vr, // Alias
    hr, // Alias
    r, // Alias
    verticalRhythm: vr,
    horizontalRhythm: hr,
    rhythm: r,
  }
}
