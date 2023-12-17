<script>
import { onMount } from "svelte";
import { gsap } from "gsap";

/**
 * Pause on hover
 * @type {boolean}
 */
export let pauseOnHover = true;

// TODO: add direction to model
/**
 * Animation direction
 * @type {"left" | "right"}
 */
export let direction = "left";

/**
 * Repeating content
 * @type {number | string}
 */
export let repeat = "full";

/**
 * Animation speed calculated as pixels/second
 * @type {number}
 */
export let speed = 25;

/**
 * Animation state
 * @type {boolean}
 */
export let play = true;

/**
 * Aria label
 * @type {string}
 */
export let label = "Marquee";

/**
 * Colors
 * @type {object}
 */
export let colors = {};
export let borders = true;

let containerWidth;
let elWidth = 100;
let marqueeEl;
let marqueeTimeline = gsap.timeline({ repeat: -1 });
let reducedMotion;

$: fillCount = (typeof repeat === "string") ? (containerWidth / elWidth) : repeat - 1;
$: duration = (containerWidth / speed) / fillCount;

onMount(() => {

	reducedMotion = (matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) ? true : false;

	marqueeTimeline.fromTo(marqueeEl.children, {
		xPercent: (direction === "left" ? 0 : -100)
	},{
		xPercent: (direction === "left" ? -100 : 0),
		duration: duration,
		ease: "linear"
	});

	marqueeTimeline.play();
});

$: if(pauseOnHover === true && reducedMotion === false) {
	if(play === true ? marqueeTimeline.resume() : marqueeTimeline.pause());
}

$: if(reducedMotion) {
	play = false;
}
</script>

<!-- svelte-ignore a11y-unknown-aria-attribute a11y-no-static-element-interactions -->
<div bind:this={marqueeEl} bind:clientWidth={containerWidth} class="marquee-container {borders === false ? "!border-0" : ""} {(colors?.bg) ? "bg-[var(--background-color)]" : ""}" style="{(colors?.bg) ? `--background-color: ${colors.bg};` : ""} {(colors?.ft) ? `--content-color: ${colors.ft};` : ""}" aria-role="marquee" aria-label={label} on:mouseenter={() => { play = false; }} on:mouseleave={() => { if(!reducedMotion) play = true; }}>
	<div class="marquee" bind:clientWidth={elWidth}>
		<slot />
	</div>
	{#each {length: fillCount} as _, i}
		<div class="marquee {borders === false ? "!border-0" : ""}" aria-hidden="true" tabindex="-1">
			<slot />
		</div>
	{/each}
</div>