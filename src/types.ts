import type { Schema } from './schemas/schema';

export type Infer<T> = T extends Schema<infer U> ? U : never;
