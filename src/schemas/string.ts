import { Schema } from './schema';

export class StringSchema extends Schema<string> {
	_parse(value: unknown, message?: string) {
		const defaultMessage = `${String(value)} is not a string`;

		if (typeof value !== 'string') {
			throw new Error(message || defaultMessage);
		}

		return value;
	}

	min(length: number, message?: string) {
		return this.refine((value) => value.length >= length, {
			message: message || `String is too short (min ${String(length)})`,
		});
	}

	max(length: number, message?: string) {
		return this.refine((value) => value.length <= length, {
			message: message || `String is too long (max ${String(length)})`,
		});
	}
}
