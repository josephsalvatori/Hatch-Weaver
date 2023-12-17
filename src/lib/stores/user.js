import { localStore } from "$js/_helpers/localstorage";
import { writable } from "svelte/store";

/** Storefront context, sync to localstorage */
export const shop = localStore("shop", {
	shop: {
		cart: {
			id: null,
			obj: {}
		},
		size: null
	}
});

/** User context */
export const user = writable({
	config: {
		dark: false,
		sidebar: true
	},
	data: {}
});