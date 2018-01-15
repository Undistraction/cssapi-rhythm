import {
  validateWhitelistedKeys,
  validateRequiredKeys,
  untilFailureValidator,
} from 'folktale-validations';
import { configKeys, requiredConfigKeys } from '../utils';

export default untilFailureValidator([
  validateWhitelistedKeys(configKeys()),
  validateRequiredKeys(requiredConfigKeys()),
]);
