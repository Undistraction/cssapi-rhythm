import { joinWithComma } from './utils';

export const throwError = message => {
  throw new Error(message);
};

export const invalidConfigMessage = validationErrors =>
  `The config object was invalid: ${joinWithComma(validationErrors)}`;
