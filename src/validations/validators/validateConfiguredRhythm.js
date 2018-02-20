import {
  andValidator,
  orValidator,
  validateIsNotUndefined,
  alwaysFailureWithPayload,
  matchWithSuccessOrFailure,
  alwaysSuccess,
} from 'folktale-validations';
import { prop, compose } from 'ramda';
import validatorUids from '../../const/validatorUIDs';

import { FIELD_NAMES } from '../../const';

const { VALIDATE_CONFIGURED_RHYTHM } = validatorUids;

const { RHYTHM, HORIZONTAL_RHYTHM, VERTICAL_RHYTHM } = FIELD_NAMES;

const rhythmProp = prop(RHYTHM);
const hRhythmProp = prop(HORIZONTAL_RHYTHM);
const vRhythmProp = prop(VERTICAL_RHYTHM);

export default v =>
  compose(
    matchWithSuccessOrFailure(
      alwaysSuccess(v),
      alwaysFailureWithPayload(VALIDATE_CONFIGURED_RHYTHM, v)
    ),
    orValidator(
      compose(validateIsNotUndefined, rhythmProp),
      andValidator(
        compose(validateIsNotUndefined, hRhythmProp),
        compose(validateIsNotUndefined, vRhythmProp)
      )
    )
  )(v);
