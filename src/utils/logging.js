import { curry, compose, tap } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import safeJsonStringify from 'safe-json-stringify';
import { joinWithColon } from '../utils';

const log = curry((loggingFunction, prefix, v) =>
  tap(
    compose(
      loggingFunction,
      joinWithColon,
      appendFlipped([prefix]),
      safeJsonStringify
    )
  )(v)
);

// eslint-disable-next-line import/prefer-default-export, no-console
export const logToConsole = log(console.log);
