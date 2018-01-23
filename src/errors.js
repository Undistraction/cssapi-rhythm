import { compose, replace } from 'ramda';
import { joinWithComma, joinWithSpace, appendTo } from './utils';
import {
  ERROR_PREFIX,
  CONFIGURE_PREFIX,
  API_VERTICAL_RHYTHM_PREFIX,
  API_HORIZONTAL_RHYTHM_PREFIX,
  API_RHYTHM_PREFIX,
} from './const';

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const throwError = message => {
  throw new Error(joinWithSpace([ERROR_PREFIX, message]));
};

const throwPrefixedError = prefix =>
  compose(throwError, joinWithSpace, appendTo([prefix]));

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwConfigureError = throwPrefixedError(CONFIGURE_PREFIX);
export const throwAPIVerticalRhythmError = throwPrefixedError(
  API_VERTICAL_RHYTHM_PREFIX
);
export const throwAPIHorizontalRhythmError = throwPrefixedError(
  API_HORIZONTAL_RHYTHM_PREFIX
);
export const throwAPIRhythmError = throwPrefixedError(API_RHYTHM_PREFIX);

// -----------------------------------------------------------------------------
// Messages
// -----------------------------------------------------------------------------

export const invalidConfigMessage = validationErrors =>
  `The config object was invalid: ${joinWithComma(validationErrors)}`;

export const invalidAPIVericalRhythmMessage = joinWithComma;
export const invalidAPIHorizontalRhythmMessage = joinWithComma;
export const invalidAPIRhythmMessage = joinWithComma;

// -----------------------------------------------------------------------------
// Validation Replacement
// -----------------------------------------------------------------------------

const replaceValidationMessagePrefix = replace(
  `Object Invalid: Object included invalid values(s)`,
  `You supplied invalid Arguments`
);

const replaceValidationMessageKey = replace(/Key /g, `Argument `);

export const replaceValidationMessage = compose(
  replaceValidationMessagePrefix,
  replaceValidationMessageKey
);
