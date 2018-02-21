import { compose, objOf, prop } from 'ramda';
import { matchWithSuccessOrFailure } from 'folktale-validations';
import { throwConfigureError } from './errors';
import validateConfig from './validations/validators/validateConfig';
import api from './api';
import { propValue, pickIsNotUndefined } from './utils';

export default config =>
  compose(
    matchWithSuccessOrFailure(
      compose(api, prop(`config`), propValue),
      compose(throwConfigureError, propValue)
    ),
    validateConfig,
    pickIsNotUndefined,
    objOf(`config`)
  )(config);
