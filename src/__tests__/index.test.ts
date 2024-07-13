import { b, Infer } from '../index';
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

	it('should infer types', () => {
		// Arrange.
		const stringSchema = b.string();
		const numberSchema = b.number();

		// Assert.
		expectTypeOf<Infer<typeof stringSchema>>().toEqualTypeOf<string>();
		expectTypeOf<Infer<typeof numberSchema>>().toEqualTypeOf<number>();
	});
});
