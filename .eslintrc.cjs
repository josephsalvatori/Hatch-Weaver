module.exports = {
	root: true,
	extends: [
		"plugin:svelte/recommended"
	],
	plugins: [],
	overrides: [
		{
			files: [
				"*.svelte"
			],
			parser: "svelte-eslint-parser",
		}
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 13
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {

	}
}