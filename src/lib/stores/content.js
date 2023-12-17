import { writable } from "svelte/store";

/** Client Settings */
export const client = writable({
	headerHeight: 60
});

export const server = writable({
	ecommerce: null,
	navigation: null,
	settings: null,
});

