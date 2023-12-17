<script>
import { XIcon } from "svelte-feather-icons";
import { fade, fly, slide } from "svelte/transition";
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
export let focus = true;
export let fullscreen = true;
export let open = false;
export let overflow = false;

bindEscape(() => {
	open = false;
});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div role="dialog" class="fixed top-0 left-0 h-full w-full z-[799] bg-black/30" tabindex="-1" on:keydown={() => {}} on:click|stopPropagation={() => { open = false; }} transition:fade={{ duration: 250 }}></div>
<section role="dialog" use:focusTrap={focus} class="fixed flex flex-col {fullscreen === true ? "left-[var(--site-gutter)] top-[var(--site-gutter)] h-[calc(100vh_-_(var(--site-gutter)_*_2))] w-[calc(100vw_-_(var(--site-gutter)_*_2))]" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"} z-[800] bg-[var(--theme-color-background)]" transition:fade="{{ duration: 250 }}">
	<header class="border-b-2 h-[60px] min-h-[60px] py-[10px] pr-[10px] flex items-center justify-between w-full">
		<div class="pl-[var(--content-gutter)]">
			<slot name="header" />
		</div>
		{#if button === true}
			<button type="button" aria-label="Close Drawer" class="btn-input" on:click|stopPropagation={() => { open = false; }}><XIcon size="20" /></button>
		{/if}
	</header>
	<div class="{overflow === false ? "overflow-y-auto overflow-x-hidden" : "overflow-auto"}">
		<slot />
	</div>
</section>