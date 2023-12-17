import { tick } from "svelte";
import { writable, get } from "svelte/store";

/**
 *
 * @param {*} initialValue
 * @returns
 */
export function createMapStore(initialValue = {}) {

	const store = writable(initialValue);

	return {
		subscribe: store.subscribe,
		update: store.update,

		get: (k) => get(store)[k],
		set: (key, value) => store.update(m => Object.assign({}, m, {[key]: value})),
		remove(k) {
			store.update(s => {
				delete s[k];
				return s;
			});
		},
	}
}

/** Global store for observers */
export const inview_observers = createMapStore({});

/**
 *
 * @param {*} node
 * @param {*} options
 * @returns
 */
export default function inview(node, options) {

	let defaultThreshold = [0, 0.3];

	let defaultOptions = {
		root: null,
		rootMargin: "0px",
		threshold: defaultThreshold,
		unobserveOnEnter: true,
		trackVisibility: false
	};

	const {
		root,
		rootMargin,
		threshold,
		unobserveOnEnter
	} = {
		...defaultOptions,
		...options
	};

	let animationThreshold = threshold[1] || threshold[0];

	let prevPos = {
		x: undefined,
		y: undefined
	};

	let scrollDirection = {
		horizontal: undefined,
		vertical: undefined
	};

	if(typeof IntersectionObserver !== "undefined" && node) {

		let observerId = "root";

		// unique id for each observer
		if(root != null) {

			if(!root.getAttribute("data-svelte-inview-id")) {

				observerId = "_" + Math.floor(Math.random() * 100000);

				root.setAttribute("data-svelte-inview-id", observerId);
			}
		}

		//
		if(!inview_observers.get(observerId)) inview_observers.set(observerId, new IntersectionObserver((entries, _observer) => {

			entries.forEach((entry) => {

				let bounds = entry.boundingClientRect;

				scrollDirection.horizontal = (prevPos.x ?? 0 > bounds.x) ? "left" : "right";
				scrollDirection.vertical = (prevPos.y ?? 0 > bounds.y) ? "up" : "down";

				prevPos.x = bounds.x;
				prevPos.y = bounds.y;

				const detail = {
					inView: entry.isIntersecting,
					entry: entry,
					scrollDirection: scrollDirection,
					node: entry.target,
					observer: _observer
				};

				entry.target.dispatchEvent(new CustomEvent("inview_change", { detail }));

				if(entry.isIntersecting) {

					entry.target.dispatchEvent(new CustomEvent("inview_enter", { detail }));

					/** Fire animation at threshold, OR when there's only 1 entry on the page (single element slice) */
					if(entry.intersectionRatio >= animationThreshold || entries.length === 1) {

						entry.target.dispatchEvent(new CustomEvent("inview_animate", { detail }));

						if(unobserveOnEnter) _observer.unobserve(entry.target);
					}

				} else {

					entry.target.dispatchEvent(new CustomEvent("inview_leave", { detail }));
				}
			});

		}, {
			root,
			rootMargin,
			threshold
		}));

		inview_observers.get(observerId).observe(node);

		tick().then(() => {
			node.dispatchEvent(new CustomEvent("inview_init", { detail: { observer: inview_observers.get(observerId), node }}));
		});

		return {
			destroy() {
				if(inview_observers.get(observerId)) {
					inview_observers.get(observerId)?.unobserve(node);
					inview_observers.remove(observerId);
				}
			}
		};

	} else {

		return {
			destroy() {}
		}
	}
}