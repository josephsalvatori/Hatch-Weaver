import { onMount } from "svelte";
import { writable } from "svelte/store";

export function bindEscape(callback = () => {}) {

	onMount(() => {

		document.addEventListener("keydown", closeEvent);

		return () => document.removeEventListener("keydown", closeEvent);
	});

	const closeEvent = (event) => {

		if(event.key === "Escape") {

			callback();
		}
	}

	return {}
};

export function bindFocus(callback = () => {}) {

	onMount(() => {

		document.addEventListener("focusout", closeEvent);

		return () => document.removeEventListener("focusout", closeEvent);
	});

	const closeEvent = (event) => {

		if(event.key === "Escape") {

			callback();
		}
	}

	return {}
};

export const toasts = writable([]);
export const addToast = (toast) => {

	/** assign id */
	const id = Math.floor(Math.random() * 10000);
	const defaults = {
		id,
		type: "info",
		dismissible: true,
		timeout: 3000
	};

	let merged = {
		...defaults,
		...toast
	};

	/** Notification to top of list */
	toasts.update((all) => [merged, ...all]);

	console.log({ ...defaults, ...toast });

	/** Dismiss on timer */
	if(merged.timeout) setTimeout(() => dismissToast(id), merged.timeout);
};

export const dismissToast = (id) => {

	console.log("dismiss", id);

	toasts.update((all) => all.filter((t) => t.id !== id));
};