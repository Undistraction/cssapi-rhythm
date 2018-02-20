import { compose, construct } from 'ramda';
import { configureRenderers } from 'folktale-validations';
import { appendFlipped } from 'ramda-adjunct';
import { joinWithSpace } from './utils';
import validatorMessages from './validations/validatorMessages';
import {
  ERROR_PREFIX,
  CONFIGURE_PREFIX,
  API_VERTICAL_RHYTHM_PREFIX,
  API_HORIZONTAL_RHYTHM_PREFIX,
  API_RHYTHM_PREFIX,
} from './const';

const { failureRenderer, argumentsFailureRenderer } = configureRenderers({
  validatorMessages,
});

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const constructError = construct(Error);

const throwError = error => {
  throw error;
};

const throwNewError = compose(throwError, constructError);

const throwErrorWithMessage = compose(
  throwNewError,
  joinWithSpace,
  appendFlipped([ERROR_PREFIX])
);

const throwErrorWithPrefixedMessage = prefix =>
  compose(throwErrorWithMessage, joinWithSpace, appendFlipped([prefix]));

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwConfigureError = compose(
  throwErrorWithPrefixedMessage(CONFIGURE_PREFIX),
  failureRenderer
);
export const throwAPIVerticalRhythmError = compose(
  throwErrorWithPrefixedMessage(API_VERTICAL_RHYTHM_PREFIX),
  argumentsFailureRenderer
);
export const throwAPIHorizontalRhythmError = compose(
  throwErrorWithPrefixedMessage(API_HORIZONTAL_RHYTHM_PREFIX),
  argumentsFailureRenderer
);
export const throwAPIRhythmError = compose(
  throwErrorWithPrefixedMessage(API_RHYTHM_PREFIX),
  argumentsFailureRenderer
);
