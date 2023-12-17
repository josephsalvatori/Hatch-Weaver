import { get, readable, writable } from "svelte/store";

export const storage = writable({
	lazyLoad: null,
	timings: 250
});

export const context = writable({
	screens: {
		account: {
			el: null,
			op: false
		},
		address: {
			el: null,
			op: false
		},
		cart: {
			el: null,
			op: false
		},
		filter: {
			el: null,
			op: false
		},
		nav: {
			el: null,
			op: false
		},
		search: {
			el: null,
			op: false
		}
	},
	checkOpen: function() {

		let ctx = get(context);
		let obj = {
			open: false,
			name: null,
			data: null
		};

		Object.keys(ctx.screens).forEach((v) => {

			if(ctx.screens[v].op === true) {
				obj.open = true;
				obj.name = v;
				obj.data = ctx.screens[v];
			}
		});

		return obj;
	},
	closeAll: function() {

		let ctx = get(context);

		/** Close all menus/screens */
		Object.keys(ctx.screens).forEach((v) => {
			ctx.screens[v].el = null;
			ctx.screens[v].op = false;
		});

		context.set(ctx);
	}
});