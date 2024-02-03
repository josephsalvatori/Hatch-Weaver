<script>
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

export let props = {};
export let type = "";

let sectionPadding = props?.data?.section_padding || props?.data?.section?.data?.section_padding || "None";
let sectionBackground = props?.data?.section_background_color || props?.data?.section?.data?.section_background_color || null;

if(sectionBackground) {
	sectionBackground = refs.colors[slugify(sectionBackground)];
}
</script>

<template>
	{#if (props?.id).indexOf("section_group") > -1 || (props?.id).indexOf("carousel") > -1}
		<div id={props?.id} class="{(type) ? `${type}-` : ""}section {(sectionPadding !== "None") ? `${refs.paddings[slugify(sectionPadding)]}` : ""} max-w-[var(--max-width)] {(sectionBackground) ? "bg-[var(--background-color)]" : ""} overflow-hidden" data-index={props?.index} data-variation={props?.variation} style="{(sectionBackground) ? `--background-color: ${sectionBackground};` : ""}">
			<slot />
		</div>
	{:else}
		<section id={props?.id} class="{(type) ? `${type}-` : ""}section {(sectionPadding !== "None") ? `${refs.paddings[slugify(sectionPadding)]}` : ""} max-w-[var(--max-width)] {(sectionBackground) ? "bg-[var(--background-color)]" : ""} overflow-hidden" data-index={props?.index} data-variation={props?.variation} style="{(sectionBackground) ? `--background-color: ${sectionBackground};` : ""}">
			<slot />
		</section>
	{/if}
</template>