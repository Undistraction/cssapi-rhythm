import {
  validateIsWhitelistedString,
  validateIsValidNumber,
} from 'folktale-validations';
import { values } from 'ramda';
import validateIsNumberOrNumberWithPx from './validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { UNITS } from './const';

// eslint-disable-next-line import/prefer-default-export
export const CONFIG = {
  fields: [
    {
      name: `rootFontSize`,
      defaultValue: 16,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: `rhythm`,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
      defaultValue: 20,
    },
    {
      name: `renderUnit`,
      defaultValue: UNITS.REM,
      validator: validateIsWhitelistedString(values(UNITS)),
    },
    {
      name: `opticalAdjustment`,
      defaultValue: 0,
      validator: validateIsValidNumber,
    },
  ],
};
