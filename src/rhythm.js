import { compose } from 'ramda';
import { matchWithSuccessOrFailure } from 'folktale-validations';
import { throwConfigureError } from './errors';
import validateConfig from './validations/validators/validateConfig';
import api from './api';
import { propValue } from './utils';

export default compose(
  matchWithSuccessOrFailure(
    compose(api, propValue),
    compose(throwConfigureError, propValue)
  ),
  validateConfig
);
