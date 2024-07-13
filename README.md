# Bodek

A zod-like schema validator, 100% type-safe.

Made for fun and learning purposes.

## Installation

```bash
npm i bodek
```

## Usage

The API is basically the same as [Zod](https://zod.dev/)'s, but only with the core functionality (again, learning purposes...)

### `parse`:

```typescript
import { b } from 'bodek';

const schema = b.object({
  name: b.string().min(3).max(10),
  age: b.number().min(18),
});

// No errors
schema.parse({
  name: 'John',
  age: 30,
});

// Throws an error
schema.parse({
  name: 'John',
  age: 10,
});
```

### `safeParse`:

```typescript
import { b } from 'bodek';

const schema = b.object({
  name: b.string().min(3).max(10),
  age: b.number().min(18),
});

const { success, data, error } = schema.safeParse({
  name: 'John',
  age: 30,
});

if (success) {
  console.log(data);
} else {
  console.error(error);
}
```

### `refine`:

```typescript
import { b } from 'bodek';

const schema = b.object({
  name: b
    .string()
    .min(3)
    .max(10)
    .refine((name) => name.toLowerCase() !== 'john', 'Name cannot be John'),
  age: b.number().min(18),
});

// Throws an error
schema.parse({
  name: 'John',
  age: 30,
});
```
