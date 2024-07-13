import { NumberSchema } from './schemas/number';
import { StringSchema } from './schemas/string';
import { ObjectSchema } from './schemas/object';

export const b = {
	string: () => new StringSchema(),
	number: () => new NumberSchema(),
	object: ObjectSchema.make,
};

export type { Infer } from './types';
