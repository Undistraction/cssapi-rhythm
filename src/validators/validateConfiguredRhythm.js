import { orValidator, validateIsNotUndefined } from 'folktale-validations';
import { validation as Validation } from 'folktale';
import { prop, always, compose } from 'ramda';
import andValidator from 'folktale-validations/lib/helpers/andValidator';
import { FIELD_NAMES } from '../const';

const { Success, Failure } = Validation;

const { RHYTHM, HORIZONTAL_RHYTHM, VERTICAL_RHYTHM } = FIELD_NAMES;

const rhythmProp = prop(RHYTHM);
const hRhythmProp = prop(HORIZONTAL_RHYTHM);
const vRhythmProp = prop(VERTICAL_RHYTHM);

export default o =>
  orValidator(
    compose(validateIsNotUndefined, rhythmProp),
    andValidator(
      compose(validateIsNotUndefined, hRhythmProp),
      compose(validateIsNotUndefined, vRhythmProp)
    )
  )(o).matchWith({
    Success: always(Success(o)),
    Failure: always(
      Failure(
        `You must supply either a '${RHYTHM}' or both a '${HORIZONTAL_RHYTHM}' and a '${VERTICAL_RHYTHM}'`
      )
    ),
  });
