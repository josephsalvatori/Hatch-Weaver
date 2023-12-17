<script>
import { sineInOut } from "svelte/easing";
import { fade, slide } from "svelte/transition";
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";
import { chunkArray } from "$js/_helpers/chunkArray";
import { asLink } from "@prismicio/client";
import { bindEscape } from "$lib/stores/functions";

export let data = {};
export let open = false;

const menuHandler = (event) => {

	let related = event.relatedTarget;

	/** Close on Focus */
	if(event.type === "focusout" && (!related || !el.contains(related))) {

		console.log("close?");

		open = false;

		return;
	}

	/** Close */
	if(event.type === "mouseleave") {

		console.log("close 2?");

		open = false;

		return;
	}

	/** Open */
	open = true;
};

let el;
let elHeight = 0;
let elLeft = 0;
let windowWidth = 0;

$: clientRect = (el) ? el.getBoundingClientRect() : undefined;
$: if(clientRect) {
	elLeft = clientRect.left;
};

let colWrapHeight = 0;
let colHeight = 0;
let columns = data?.primary?.columns || 2;
let justify = data?.primary?.flex_content_justification || true;
let flexContent = (data?.primary?.flex_content?.data?.slices) ? data.primary.flex_content.data.slices.slice(0, 2) : null;
let linkColumns = (flexContent && columns > 1) ? columns - 1 : columns;

/** Max columns to 4 */
if(columns > 4) columns = 4;

/** Max content columns to allow a split fill */
if(Math.ceil(data.items.length / linkColumns) < 8 && linkColumns > 1) linkColumns = linkColumns - 1;

let itemGroups = chunkArray(data.items, Math.ceil(data.items.length / linkColumns));

bindEscape(() => {
	open = false;
});
</script>

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

<li bind:this={el} bind:clientHeight={elHeight} class="flex items-center h-full mr-[var(--content-gutter)] relative" style="--el-height: {elHeight + 2}px; --el-left: -{elLeft}px; --el-width: calc({(windowWidth > 1024) ? windowWidth - 12 : windowWidth}px - calc(var(--content-gutter) * 2));" on:mouseleave|self|stopPropagation={menuHandler} on:focusout|stopPropagation={menuHandler}>
	<button class="btn-nav" class:is-active={open} type="button" on:mouseenter|self|preventDefault={menuHandler} on:click={menuHandler} on:focus={menuHandler}>{data.primary.menu_text}</button>
	{#if open}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div aria-roledescription="Close Menu" class="absolute h-[calc(100vh_-_var(--el-height))] w-screen top-[var(--el-height)] left-[var(--el-left)] bg-black/30 z-0" transition:fade={{ duration: 250, easing: sineInOut }} on:mouseenter|preventDefault={() => { open = false; }} tabindex="-1"></div>
		<div class="absolute bottom-[0.5px] px-[var(--content-gutter)] left-[var(--el-left)] pointer-events-none translate-y-full">
			<div class="bg-[var(--theme-color-background)] border-b-2 border-x-2 rounded-b-[var(--border-radius)] p-[var(--content-gutter)] pointer-events-auto w-[var(--el-width)]" transition:slide={{ y: 0, duration: 250, easing: sineInOut }}>
				<div bind:clientHeight={colWrapHeight} class="grid grid-area-{columns} gap-[var(--grid-gap)] min-h-[var(--wrapper-height)]" style="--wrapper-height: {(colWrapHeight > 300) ? colWrapHeight : 300}px;">
					{#if justify === false}
						<div class="grid-content {(columns - linkColumns === 1) ? "col-span-1" : "col-span-2 grid-area-2 gap-[var(--grid-gap)]"}" style="--max-height: {(colHeight > 300 ? colHeight : 300)}px;">
							{#each flexContent as slice, index}
								<SliceSwitch slice={slice} index={index} />
							{/each}
						</div>
					{/if}
					{#if itemGroups[0]}
						<div class="flex flex-col justify-between">
							<ul class="" bind:clientHeight={colHeight}>
								{#each itemGroups[0] as navItem}
									{#if navItem.link?.url}
										<li class="pb-[10px] whitespace-nowrap"><a tabindex={"0"} href={asLink(navItem.link)}>{navItem.link_text || navItem.link.slug}</a></li>
									{/if}
								{/each}
							</ul>
							{#if data.primary?.link?.url}
								<p class="whitespace-nowrap"><a tabindex={"0"} href={asLink(data.primary.link)}>{data.primary.link_text || data.primary.link.slug}</a></p>
							{/if}
						</div>
					{/if}
					{#each itemGroups as group, i}
						{#if i > 0}
							<ul class="">
								{#each group as navItem}
									{#if navItem.link?.url}
										<li class="pb-[10px] whitespace-nowrap"><a tabindex={"0"} href={asLink(navItem.link)}>{navItem.link_text || navItem.link.slug}</a></li>
									{/if}
								{/each}
							</ul>
						{/if}
					{/each}
					{#if justify === true}
						<div class="grid-content {(columns - linkColumns === 1) ? "col-span-1" : "col-span-2 grid-area-2 gap-[var(--grid-gap)]"}" style="--max-height: {(colHeight > 300 ? colHeight : 300)}px;">
							{#each flexContent as slice, index}
								<SliceSwitch slice={slice} index={index} />
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</li>