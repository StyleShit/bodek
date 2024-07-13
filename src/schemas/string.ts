import { Schema } from './schema';

export class StringSchema extends Schema<string> {
	parse(value: any, message?: string) {
		const defaultMessage = `${String(value)} is not a string`;

		if (typeof value !== 'string') {
			throw new Error(message || defaultMessage);
		}

		return value;
	}
}
