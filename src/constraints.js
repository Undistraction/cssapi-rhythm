import {
  validateIsWhitelistedString,
  validateIsValidNumber,
} from 'folktale-validations';
import { values } from 'ramda';
import validateIsNumberOrNumberWithPx from './validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { UNITS, FIELD_NAMES } from './const';
import validateConfiguredRhythm from './validators/validateConfiguredRhythm';

const {
  ROOT_FONT_SIZE,
  RHYTHM,
  RENDER_UNIT,
  OPTICAL_ADJUSTMENT,
  HORIZONTAL_RHYTHM,
  VERTICAL_RHYTHM,
} = FIELD_NAMES;

// eslint-disable-next-line import/prefer-default-export
export default {
  fieldsValidator: validateConfiguredRhythm,
  fields: [
    {
      name: ROOT_FONT_SIZE,
      defaultValue: 16,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: RHYTHM,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: HORIZONTAL_RHYTHM,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: VERTICAL_RHYTHM,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: RENDER_UNIT,
      defaultValue: UNITS.REM,
      validator: validateIsWhitelistedString(values(UNITS)),
    },
    {
      name: OPTICAL_ADJUSTMENT,
      defaultValue: 0,
      validator: validateIsValidNumber,
    },
  ],
};
