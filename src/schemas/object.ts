import type { Infer } from '../types';
import { Schema } from './schema';

export type ShapeSchema = Record<string, Schema<any>>;

export type ShapeToObject<Shape extends ShapeSchema> = {
	[Key in keyof Shape]: Infer<Shape[Key]>;
};

type Flatten<T> = T extends object ? { [K in keyof T]: T[K] } : T;

export class ObjectSchema<Shape extends ShapeSchema> extends Schema<
	Flatten<ShapeToObject<Shape>>
> {
	constructor(private shape: Shape) {
		super();
	}

	static make<Shape extends ShapeSchema>(this: void, shape: Shape) {
		return new ObjectSchema(shape);
	}

	_parse(value: unknown, message?: string) {
		const defaultMessage = `${String(value)} is not an object`;

		if (typeof value !== 'object' || !value || Array.isArray(value)) {
			throw new Error(message || defaultMessage);
		}

		Object.entries(this.shape).forEach(([key, schema]) => {
			if (!(key in value)) {
				throw new Error(`Missing key ${key}`);
			}

			schema.parse(value[key as never]);
		});

		Object.keys(value).forEach((key) => {
			if (!(key in this.shape)) {
				throw new Error(`Unexpected excess key ${key}`);
			}
		});

		return value as never;
	}
}
