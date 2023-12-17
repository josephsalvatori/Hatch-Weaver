<script>
import { slide } from "svelte/transition";
import { expoInOut } from "svelte/easing";
import { ArrowRightIcon } from "svelte-feather-icons";
import { asLink } from "@prismicio/client";

export let data = {};
export let open = false;

let linkOpen = (data?.primary?.link_open) ? data.primary.link_open : true;

if(linkOpen === true) open = true;

let el;
</script>

<li bind:this={el} class="pb-[var(--content-gap)] relative">
	<button type="button" class="flex items-center justify-between w-full" on:click|preventDefault={() => { open = !open; }}>
		<span>{data.primary.menu_text}</span>
		<span class="transform transition-transform {(open ? "rotate-90" : "")}"><ArrowRightIcon size={"20"} /></span>
	</button>
	{#if open}
		<ul class="pt-[var(--content-gap)] px-[var(--content-gutter)] [&>*:last-child]:pb-0" transition:slide={{ y: 0, duration: 250, easing: expoInOut, opacity: 1 }}>
			{#each data.items as navItem}
				<li class="pb-[10px] whitespace-nowrap"><a tabindex={"0"} href={asLink(navItem.link)}>{navItem.link_text || navItem.link.slug}</a></li>
			{/each}
			{#if data.primary?.link?.url}
				<li class="whitespace-nowrap"><a tabindex={"0"} href={asLink(data.primary.link)}>{data.primary.link_text || data.primary.link.slug}</a></li>
			{/if}
		</ul>
	{/if}
</li>