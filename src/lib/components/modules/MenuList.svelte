<script>
import { slide } from "svelte/transition";
import { asLink } from "@prismicio/client";
import { expoInOut } from "svelte/easing";
import { bindEscape } from "$lib/stores/functions";

export let data = {};
export let open = false;

const menuHandler = (event) => {

	let related = event.relatedTarget;

	/** Close on Focus */
	if(event.type === "focusout" && (!related || !el.contains(related))) {

		open = false;

		return;
	}

	/** Close */
	if(event.type === "mouseleave") {

		open = false;

		return;
	}

	/** Open */
	open = true;
};

let el;

bindEscape(() => {
	open = false;
});
</script>

<li bind:this={el} class="flex items-center h-full mr-[var(--content-gap)] relative" on:mouseleave={menuHandler} on:focusout|preventDefault={menuHandler}>
	<button type="button" on:mouseenter|preventDefault={() => { open = true; }} on:click={menuHandler} on:focus|preventDefault={() => { open = true; }}>{data.primary.menu_text}</button>
	{#if open}
		<ul class="absolute bg-[var(--theme-color-background)] border-b-2 border-x-2 rounded-b-[var(--border-radius)] bottom-[0.5px] -left-[var(--content-gutter)] p-[var(--content-gutter)] translate-y-full [&>*:last-child]:pb-0" transition:slide={{ y: 0, duration: 250, easing: expoInOut, opacity: 1 }}>
			{#each data.items as navItem}
				<li class="pb-[10px] whitespace-nowrap"><a tabindex={"0"} href={asLink(navItem.link)}>{navItem.link_text || navItem.link.slug}</a></li>
			{/each}
			{#if data.primary?.link?.url}
				<li class="whitespace-nowrap"><a tabindex={"0"} href={asLink(data.primary.link)}>{data.primary.link_text || data.primary.link.slug}</a></li>
			{/if}
		</ul>
	{/if}
</li>