import { isNotUndefined, isUndefined } from 'ramda-adjunct';
import { equals } from 'ramda';
import { compressWhitespace, messageActual } from './utils';

const name = `toThrowMatchingErrorWithCompressedWhitespace`;

const toThrowMatchingErrorWithCompressedWhitespace = (actual, expected) => {
  let error;
  try {
    actual();
  } catch (e) {
    error = e.message;
  }

  if (isUndefined(error)) {
    return {
      message: `Expected it to throw but it didn't throw anything`,
    };
  }

  const [
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace,
  ] = compressWhitespace([error, expected]);

  const match = equals(
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace
  );

  const pass = isNotUndefined(error) && match;

  const message = messageActual(
    pass,
    name,
    error,
    expected,
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace
  );
  return {
    actual: error,
    expected,
    message,
    name,
    pass,
  };
};

export default toThrowMatchingErrorWithCompressedWhitespace;
