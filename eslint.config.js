import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			// We're gonna use some of those...
			'@typescript-eslint/no-explicit-any': 'off',

			'@typescript-eslint/no-invalid-void-type': [
				'error',
				{
					allowAsThisParameter: true,
				},
			],
		},
	},
	{
		ignores: [
			'**/coverage/**',
			'**/dist/**',
			'**/node_modules/**',
			'**/__snapshots__/**',
		],
	},
);
