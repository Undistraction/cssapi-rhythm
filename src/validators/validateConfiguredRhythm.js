import { orValidator, validateIsNotUndefined } from 'folktale-validations';
import { validation as Validation } from 'folktale';
import { prop, always, compose } from 'ramda';
import andValidator from 'folktale-validations/lib/helpers/andValidator';

const { collect, Success, Failure } = Validation;

const rhythmProp = prop(`rhythm`);
const hRhythmProp = prop(`horizontalRhythm`);
const vRhythmProp = prop(`verticalRhythm`);

console.log(`SUCCESS`, collect);

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
        `You must supply either a 'rhythm' or both a 'horizontalRhythm' and a 'verticalRhythm'`
      )
    ),
  });
