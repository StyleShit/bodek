import { Schema } from './schema';

export class NumberSchema extends Schema<number> {
	parse(value: any, message?: string) {
		const defaultMessage = `${String(value)} is not a number`;

		if (typeof value !== 'number') {
			throw new Error(message || defaultMessage);
		}

		return value;
	}
}
