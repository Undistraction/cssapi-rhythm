import { validateObjectWithConstraints } from 'folktale-validations';
import { CONFIG } from '../../constraints';

export default o => validateObjectWithConstraints(CONFIG, o);
