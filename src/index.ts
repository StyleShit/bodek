import { NumberSchema } from './schemas/number';
import { StringSchema } from './schemas/string';
import { ObjectSchema } from './schemas/object';

export const b = {
	string: StringSchema.make,
	number: NumberSchema.make,
	object: ObjectSchema.make,
};

export type { Infer } from './types';
