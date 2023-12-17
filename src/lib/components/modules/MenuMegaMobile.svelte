<script>
import { sineInOut } from "svelte/easing";
import { fade, slide } from "svelte/transition";
import { ArrowRightIcon } from "svelte-feather-icons";
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";
import { chunkArray } from "$js/_helpers/chunkArray";
import { asLink } from "@prismicio/client";

export let data = {};
export let open = false;

let el;
let windowWidth = 0;

let columns = data?.primary?.columns || 2;
let flexContent = (data?.primary?.flex_content?.data?.slices) ? data.primary.flex_content.data.slices.slice(0, 2) : null;
let flexInside = (data?.primary?.flex_inside) ? data.primary.flex_inside : true;
let flexHide = (data?.primary?.flex_hide) ? data.primary.flex_hide : false;
let linkColumns = (flexContent && columns > 1) ? columns - 1 : columns;
let linkOpen = (data?.primary?.link_open) ? data.primary.link_open : true;

if(linkOpen === true) open = true;

/** Max columns to 4 */
if(columns > 4) columns = 4;

/** Max content columns to allow a split fill */
if(Math.ceil(data.items.length / linkColumns) < 4 && linkColumns > 1) linkColumns = linkColumns - 1;

let itemGroups = chunkArray(data.items, Math.ceil(data.items.length / linkColumns));
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

<li bind:this={el} class="flex flex-col items-start pb-[var(--content-gutter)] relative">
	<button type="button" class="flex items-center justify-between w-full" on:click|preventDefault={() => { open = !open; }}>
		<span>{data.primary.menu_text}</span>
		<span class="transform transition-transform {(open ? "rotate-90" : "")}"><ArrowRightIcon size={"20"} /></span>
	</button>
	{#if open}
		<div class="pt-[var(--content-gap)] px-[var(--content-gutter)] pointer-events-auto w-full" transition:slide={{ y: 0, duration: 250, easing: sineInOut }}>
			<div class="grid grid-area-{columns} gap-[var(--grid-gap)] text-left">
				{#each itemGroups as group, i}
					<ul>
						{#each group as navItem}
							{#if navItem.link?.url}
								<li class="pb-[10px] whitespace-nowrap"><a tabindex={"0"} href={asLink(navItem.link)}>{navItem.link_text || navItem.link.slug}</a></li>
							{/if}
						{/each}
					</ul>
				{/each}
			</div>
			{#if data.primary?.link?.url}
				<p class="pt-[20px] whitespace-nowrap"><a tabindex={"0"} href={asLink(data.primary.link)}>{data.primary.link_text || data.primary.link.slug}</a></p>
			{/if}
			{#if flexContent && flexHide === false && flexInside === true}
				<div class="grid-content pt-[var(--content-gap)] w-full {(columns - linkColumns === 1) ? "col-span-1" : "col-span-2 grid-area-2 gap-[var(--grid-gap)]"}" style="--max-height: 300px;">
					{#each flexContent as slice, index}
						<SliceSwitch slice={slice} index={index} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
	{#if flexContent && flexHide === false && flexInside === false}
		<div class="grid-content pt-[var(--content-gap)] w-full {(columns - linkColumns === 1) ? "col-span-1" : "col-span-2 grid-area-2 gap-[var(--grid-gap)]"}" style="--max-height: 300px;">
			{#each flexContent as slice, index}
				<SliceSwitch slice={slice} index={index} />
			{/each}
		</div>
	{/if}
</li>