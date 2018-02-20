import { replace, map } from 'ramda';
import diff from 'jest-diff';

import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';

export const replaceWhitespace = replace(/\s+/g, ` `);
export const compressWhitespace = map(replaceWhitespace);

export const messageActual = (
  pass,
  name,
  received,
  expected,
  receivedWithCompresssedWhitespace,
  expectedWithCompresssedWhitespace
) =>
  pass
    ? () =>
        `${matcherHint(`.not.${name}`)}\n\n` +
        `Uncompressed expected value:\n` +
        `  ${printExpected(expected)}\n` +
        `Expected value with compressed whitespace to not equal:\n` +
        `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
        `Uncompressed received value:\n` +
        `  ${printReceived(received)}\n` +
        `Received value with compressed whitespace:\n` +
        `  ${printReceived(receivedWithCompresssedWhitespace)}`
    : () => {
        const diffString = diff(expected, received);
        return (
          `${matcherHint(`.${name}`)}\n\n` +
          `Uncompressed expected value:\n` +
          `  ${printExpected(expected)}\n` +
          `Expected value with compressed whitespace to equal:\n` +
          `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
          `Uncompressed received value:\n` +
          `  ${printReceived(received)}\n` +
          `Received value with compressed whitespace:\n` +
          `  ${printReceived(receivedWithCompresssedWhitespace)}${
            diffString ? `\n\nDifference:\n\n${diffString}` : ``
          }`
        );
      };
