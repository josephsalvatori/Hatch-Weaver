<script>
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

export let props = {};
export let type = "";

let sectionPadding = props?.data?.section_padding || props?.data?.section?.data?.section_padding || "None";
let sectionBackground = props?.data?.section_background_color || props?.data?.section?.data?.section_background_color || null;
</script>

<template>
	<section id={props?.id} class="{(type) ? `${type}-` : ""}section {(sectionPadding !== "None") ? `${refs.paddings[slugify(sectionPadding)]}` : ""} max-w-[var(--max-width)] {(sectionBackground) ? "bg-[var(--background-color)]" : ""} overflow-hidden" data-index={props?.index} data-variation={props?.variation} style="{(sectionBackground) ? `--background-color: ${sectionBackground};` : ""}">
		<slot />
	</section>
</template>

<style lang="scss">
:global(.slice-section) {
	min-height: 100%;
	position: relative;

	&:empty {
		display: none;
	}
}

:global(.group-section) {

	&:empty {
		display: none;
	}

	// Section has gaps
	.grid-gap {

		.slice-section {
			border-radius: var(--border-radius);
		}
	}
}
</style>