import { equals } from 'ramda';
import { compressWhitespace, messageActual } from './utils';

const name = `toEqualWithCompressedWhitespace`;

export default (received, expected) => {
  const [
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace,
  ] = compressWhitespace([received, expected]);
  const pass = equals(
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace
  );

  const message = messageActual(
    pass,
    name,
    received,
    expected,
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace
  );
  return {
    actual: received,
    expected,
    message,
    name,
    pass,
  };
};
