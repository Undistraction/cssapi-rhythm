import { validateObjectWithConstraints } from 'folktale-validations';
import { validation as Validation } from 'folktale';
import { compose, head, of } from 'ramda';
import { API_VERTICAL_RHYTHM } from '../constraints';
import { replaceValidationMessage } from '../errors';

const { Failure } = Validation;

export default o =>
  validateObjectWithConstraints(API_VERTICAL_RHYTHM)(o).orElse(
    compose(Failure, of, replaceValidationMessage, head)
  );
