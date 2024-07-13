export abstract class Schema<Type> {
	abstract parse(value: any, message?: string): Type;
}
