import {
  validateIsWhitelistedString,
  validateIsValidNumber,
} from 'folktale-validations';
import { values, identity } from 'ramda';
import validateIsNumberOrNumberWithPx from './validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { UNITS } from './const';

// eslint-disable-next-line import/prefer-default-export
export const CONFIG = [
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
    transformer: identity,
  },
  {
    name: `opticalAdjustment`,
    defaultValue: 0,
    validator: validateIsValidNumber,
    transformer: identity,
  },
];
