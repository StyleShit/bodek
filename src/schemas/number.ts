import { Schema } from './schema';

export class NumberSchema extends Schema<number> {
	static make(this: void) {
		return new NumberSchema();
	}

	_parse(value: unknown, message?: string) {
		const defaultMessage = `${String(value)} is not a number`;

		if (typeof value !== 'number') {
			throw new Error(message || defaultMessage);
		}

		return value;
	}

	min(length: number, message?: string) {
		return this.refine((value) => value >= length, {
			message: message || `Number is too small (min ${String(length)})`,
		});
	}

	max(length: number, message?: string) {
		return this.refine((value) => value <= length, {
			message: message || `Number is too big (max ${String(length)})`,
		});
	}
}
