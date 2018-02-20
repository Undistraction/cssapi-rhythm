import { always } from 'ramda';
import validatorUids from '../const/validatorUIDs';

const { VALIDATE_CONFIGURED_RHYTHM } = validatorUids;

const messages = {
  [VALIDATE_CONFIGURED_RHYTHM]: always(
    `You must supply either a 'rhythm' or both 'hRhythm' and 'vRhythm' values`
  ),
};

export default messages;
