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

	it('should check strings length', () => {
		// Arrange.
		const schema = b.string().min(3).max(5);

		// Assert - valid.
		const parsed = schema.parse('hello');

		expect(parsed).toBe('hello');
		expectTypeOf(parsed).toEqualTypeOf<string>();

		// Assert - invalid.
		expect(() => schema.parse('hi')).toThrow('String is too short (min 3)');

		expect(() => schema.parse('world!')).toThrow(
			'String is too long (max 5)',
		);
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

	it('should check numbers range', () => {
		// Arrange.
		const schema = b.number().min(3).max(5);

		// Assert - valid.
		const parsed = schema.parse(4);

		expect(parsed).toBe(4);
		expectTypeOf(parsed).toEqualTypeOf<number>();

		// Assert - invalid.
		expect(() => schema.parse(2)).toThrow('Number is too small (min 3)');
		expect(() => schema.parse(6)).toThrow('Number is too big (max 5)');
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

	it('should support custom errors', () => {
		// Arrange.
		const userNameSchema = b.string();
		const errorMessage = 'Username must be a string';

		// Act & Assert.
		expect(() => userNameSchema.parse(123, errorMessage)).toThrow(
			errorMessage,
		);
	});

	it('should refine a schema', () => {
		// Arrange.
		const schema = b
			.number()
			.refine((value) => value > 0, {
				message: 'Number must be positive',
			})
			.refine((value) => value % 2 === 0, {
				message: 'Number must be even',
			});

		// Assert - valid.
		const parsed = schema.parse(2);

		expect(parsed).toBe(2);
		expectTypeOf(parsed).toEqualTypeOf<number>();

		// Assert - invalid.
		expect(() => schema.parse(-2)).toThrow('Number must be positive');
		expect(() => schema.parse(3)).toThrow('Number must be even');
	});

	it('should support safe parsing', () => {
		// Arrange.
		const schema = b.number();

		// Assert - valid.
		expect(schema.safeParse(123)).toEqual({
			success: true,
			data: 123,
		});

		// Assert - invalid.
		expect(schema.safeParse('hello')).toEqual({
			success: false,
			error: new Error('hello is not a number'),
		});

		expectTypeOf(schema.safeParse(123)).toEqualTypeOf<
			{ success: true; data: number } | { success: false; error: Error }
		>();
	});
});
