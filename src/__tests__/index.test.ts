import { b, type Infer } from '../index';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('Bodek', () => {
	it('should parse strings', () => {
		// Arrange.
		const schema = b.string();

		// Assert - valid.
		const parsed = schema.parse('hello');

		expect(parsed).toBe('hello');
		expectTypeOf(parsed).toEqualTypeOf<string>();

		// Assert - invalid.
		expect(() => schema.parse(123)).toThrow('123 is not a string');
	});

	it('should parse numbers', () => {
		// Arrange.
		const schema = b.number();

		// Assert - valid.
		const parsed = schema.parse(123);

		expect(parsed).toBe(123);
		expectTypeOf(parsed).toEqualTypeOf<number>();

		// Assert - invalid.
		expect(() => schema.parse('hello')).toThrow('hello is not a number');
	});

	it('should parse objects', () => {
		// Arrange.
		const schema = b.object({
			foo: b.string(),
			bar: b.number(),
			nested: b.object({
				baz: b.string(),
			}),
		});

		// Assert - valid.
		const parsed = schema.parse({
			foo: 'hello',
			bar: 123,
			nested: { baz: 'world' },
		});

		expect(parsed).toEqual({
			foo: 'hello',
			bar: 123,
			nested: { baz: 'world' },
		});

		expectTypeOf(parsed).toEqualTypeOf<{
			foo: string;
			bar: number;
			nested: { baz: string };
		}>();

		// Assert - invalid.
		expect(() => schema.parse({ foo: 'hello' })).toThrow('Missing key bar');
	});

	it('should infer types', () => {
		// Arrange.
		const schema = b.object({
			foo: b.string(),
			bar: b.number(),
			nested: b.object({
				baz: b.string(),
			}),
		});

		// Assert.
		type Inferred = Infer<typeof schema>;

		expectTypeOf<Inferred>().toEqualTypeOf<{
			foo: string;
			bar: number;
			nested: { baz: string };
		}>();
	});
});
