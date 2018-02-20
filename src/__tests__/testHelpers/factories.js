import { merge } from 'ramda';

const minimumValidConfig = {
  rhythm: 20,
};

// eslint-disable-next-line import/prefer-default-export
export const buildConfig = (config = {}) => merge(minimumValidConfig, config);
