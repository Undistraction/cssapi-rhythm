import { values } from 'ramda';
import {
  validateIsWhitelistedValue,
  validateIsValidNumber,
  validateIsPlainObject,
} from 'folktale-validations';
import validateIsNumberOrNumberWithPx from './validations/validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { UNITS, FIELD_NAMES } from './const';
import validateConfiguredRhythm from './validations/validators/validateConfiguredRhythm';

const {
  ROOT_FONT_SIZE,
  RHYTHM,
  RENDER_UNIT,
  OPTICAL_ADJUSTMENT,
  HORIZONTAL_RHYTHM,
  VERTICAL_RHYTHM,
  UNIT,
  ARG1,
  ARG2,
  ARG3,
  ARG4,
} = FIELD_NAMES;

export const CONFIG = {
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
      validator: validateIsWhitelistedValue(values(UNITS)),
    },
    {
      name: OPTICAL_ADJUSTMENT,
      defaultValue: 0,
      validator: validateIsValidNumber,
    },
  ],
};

export const RHYTHM_ARGS = {
  fields: [
    {
      name: `config`,
      validator: validateIsPlainObject,
      isRequired: true,
      value: CONFIG,
    },
  ],
};

export const API_VERTICAL_RHYTHM = {
  fields: [
    {
      name: UNIT,
      validator: validateIsValidNumber,
      isRequired: true,
    },
  ],
};

export const API_HORIZONTAL_RHYTHM = {
  fields: [
    {
      name: UNIT,
      validator: validateIsValidNumber,
      isRequired: true,
    },
  ],
};

export const API_RHYTHM = {
  fields: [
    {
      name: ARG1,
      validator: validateIsValidNumber,
      isRequired: true,
    },
    {
      name: ARG2,
      validator: validateIsValidNumber,
    },
    {
      name: ARG3,
      validator: validateIsValidNumber,
    },
    {
      name: ARG4,
      validator: validateIsValidNumber,
    },
  ],
};
