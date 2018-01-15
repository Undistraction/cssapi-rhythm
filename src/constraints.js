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
    default: 16,
    validator: validateIsNumberOrNumberWithPx,
    transformer: numberOrPxNumberToNumber,
    isRequired: true,
  },
  {
    name: `rhythm`,
    validator: validateIsNumberOrNumberWithPx,
    transformer: numberOrPxNumberToNumber,
    default: 20,
    isRequired: true,
  },
  {
    name: `renderUnit`,
    default: UNITS.REM,
    validator: validateIsWhitelistedString(values(UNITS)),
    transformer: identity,
    isRequired: true,
  },
  {
    name: `opticalAdjustment`,
    default: 0,
    validator: validateIsValidNumber,
    transformer: identity,
    isRequired: true,
  },
];
