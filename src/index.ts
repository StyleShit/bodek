import { NumberSchema } from './schemas/number';
import { StringSchema } from './schemas/string';

export const b = {
	string: () => new StringSchema(),
	number: () => new NumberSchema(),
};
