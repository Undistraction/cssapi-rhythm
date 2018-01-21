import { merge } from 'ramda';

const minimalValidConfig = {
  rhythm: 20,
};

// eslint-disable-next-line import/prefer-default-export
export const buildConfig = (config = {}) => merge(minimalValidConfig, config);
