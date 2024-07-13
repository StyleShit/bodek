type RefineValidator<T> = (value: T) => boolean;

type RefineParams = {
	message?: string;
};

type SafeParseResult<T> =
	| { success: true; data: T }
	| { success: false; error: Error };

export abstract class Schema<Type> {
	private refinements: Array<{
		validator: RefineValidator<Type>;
		params: RefineParams;
	}> = [];

	abstract _parse(value: unknown, message?: string): Type;

	parse(value: unknown, message?: string) {
		const parsed = this._parse(value, message);

		this.refinements.forEach(({ validator, params }) => {
			const isValid = validator(parsed);

			if (!isValid) {
				throw new Error(params.message || message || 'Invalid value');
			}
		});

		return parsed;
	}

	safeParse(value: unknown, message?: string): SafeParseResult<Type> {
		try {
			const data = this.parse(value, message);

			return {
				success: true,
				data,
			};
		} catch (error) {
			return {
				success: false,
				error: error as Error,
			};
		}
	}

	refine(validator: RefineValidator<Type>, params?: RefineParams) {
		this.refinements.push({
			validator,
			params: params || {},
		});

		return this;
	}
}
