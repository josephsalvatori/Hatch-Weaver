<script>
import { XIcon } from "svelte-feather-icons";
import { fade, slide } from "svelte/transition";
import { cubicInOut } from "svelte/easing";
import { focusTrap } from "$js/_helpers/focusTrap";
import { bindEscape } from "$lib/stores/functions";

/**
 * A slide-out drawer slot
 * @typedef {Object} Slot~Drawer
 * @param {boolean} button
 * @param {string} direction
 * @param {boolean} focus
 * @param {boolean} open
 */
export let button = true;
export let direction = "right";
export let focus = true;
export let open = false;

bindEscape(() => {
	open = false;
});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div role="dialog" class="fixed top-0 left-0 h-full w-full z-[79] bg-black/30" tabindex="-1" on:keydown={() => {}} on:click|stopPropagation={() => { open = false; }} transition:fade={{ duration: 300 }}></div>
<section role="dialog" use:focusTrap={focus} class="fixed flex flex-col top-0 {(direction === "left" ? "left-0 items-end" : "right-0")} h-full w-full max-w-[600px] z-[80] bg-[var(--theme-color-background)]" transition:slide="{{ axis: "x", duration: 300, easing: cubicInOut }}">
	<header class="border-b-2 h-[60px] min-h-[60px] p-[10px] grid justify-end w-full">
		{#if button === true}
			<button type="button" aria-label="Close Drawer" class="btn-input" on:click|stopPropagation={() => { open = false; }}><XIcon size="20" /></button>
		{/if}
	</header>
	<div class="overflow-y-auto overflow-x-hidden {(direction === "left" ? "flex flex-col items-end w-full" : "")}">
		<slot />
	</div>
</section>