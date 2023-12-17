<script>
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";
import { refs } from "$js/_helpers/refs";
import { isFilled } from "@prismicio/helpers";

/**
 * A description
 * @typedef {Object} Slice~SectionGroup
 * @param {Object} data slice non-repeatable fields
 */
export let data;
export let items = [];

const section = data?.section?.data;

/** Columns */
let column_count = (data?.column_count && parseInt(data?.column_count) < 6) ? parseInt(data.column_count) : 1;
let column_gap = data?.column_gap || false;
let column_screen = data?.column_screen || false;
let column_alignment = data?.column_alignment || "Fill";
let column_max_width = data?.column_max_width || null;
let section_padding = data?.section_padding || "None";

if(column_max_width) {
	if(column_max_width > 1600) column_max_width = 1600;
	if(column_max_width < 240) column_max_width = 240;
}
</script>

{#if isFilled.sliceZone(section?.slices)}
	<div data-items={items?.length > 0 ? items.length : null} class="grid-area-{column_count} grid-align-{refs.alignment[column_alignment.toLowerCase()]} grid-flex {(column_gap ? "gap-x-[var(--grid-gap-x,_30px)] gap-y-[var(--grid-gap-y,_30px)] grid-gap" : "")} {(column_screen && section_padding == "None" ? "min-h-screen" : (column_screen && section_padding !== "None" ? "min-h-[calc(100vh_-_calc(var(--site-gutter)_*_2))]" : ""))} {(column_max_width) ? "justify-items-center" : ""}" style="--grid-max-cols: repeat({column_count}, minmax(0, 1fr)); {(column_max_width) ? `--max-width: ${column_max_width}px;` : "--max-width: 100%;"}">
		{#each section.slices as slice, i}
			<SliceSwitch slice={slice} index={i} />
		{/each}
	</div>
{/if}