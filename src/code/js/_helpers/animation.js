import { gsap } from "gsap";

/**
 * @typedef {object} Animation
 * @property {gsap.set} init	Set the animation resting state.
 * @property {gsap.fromTo} run		Run the animation.
 */

/**
 * @param {gsap.TweenTarget} selector
 * @param {object} [options]
 * @param {gsap.TweenVars} [options.from]
 * @param {gsap.TweenVars} [options.set]
 * @param {gsap.TweenVars} [options.to]
 * @returns {Animation}
 */
export const staggerFade = (selector, options = {}) => {

	const defaultOptions = {
		from: {
			opacity: 0
		},
		set: {
			opacity: 0
		},
		to: {
			duration: 0.35,
			opacity: 1,
			stagger: 0.2
		}
	};

	const {
		from,
		set,
		to
	} = {
		from: {
			...defaultOptions.from,
			...options.from
		},
		set: {
			...defaultOptions.set,
			...options.set
		},
		to: {
			...defaultOptions.to,
			...options.to
		}
	};

	return {
		init: () => gsap.set(selector, set),
		run: () => gsap.fromTo(selector, from, to)
	}
};

export const staggerFadeIn = (selector, options = {}) => {
	const defaultOptions = {
		from: {
			opacity: 0,
			y: 60
		},
		set: {
			opacity: 0,
			y: 60
		},
		to: {
			ease: "power2.out",
			duration: 0.35,
			opacity: 1,
			y: 0,
			stagger: 0.2
		}
	};

	const {
		from,
		set,
		to
	} = {
		from: {
			...defaultOptions.from,
			...options.from
		},
		set: {
			...defaultOptions.set,
			...options.set
		},
		to: {
			...defaultOptions.to,
			...options.to
		}
	};

	return {
		init: () => gsap.set(selector, set),
		run: () => gsap.fromTo(selector, from, to)
	}
};