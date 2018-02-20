// eslint-disable-next-line no-unused-vars
import JasmineExpect from 'jasmine-expect';
import toEqualWithCompressedWhitespace from './toEqualWithCompressedWhitespace';
import toThrowMatchingErrorWithCompressedWhitespace from './toThrowMatchingErrorWithCompressedWhitespace';

expect.extend({
  toEqualWithCompressedWhitespace,
  toThrowMatchingErrorWithCompressedWhitespace,
});
