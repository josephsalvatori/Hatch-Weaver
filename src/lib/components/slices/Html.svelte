<script>
import inview from "$lib/stores/observer";
import { asText, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";

/**
 * A description
 * @typedef {Object} Slice~Html
 * @param {Object} data slice non-repeatable fields
 */
export let data;
export let items = [];

/**
 * Observer
 * use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}
 */
let animation;
let isInView = false;
let inViewOptions = {};
let inViewInit = ({ detail, node }) => { animation = staggerFade(detail.node.children); animation.init(); };
let inViewChange = ({ detail }) => isInView = detail?.inView;
let inViewAnimate = ({ detail }) => animation.run();

/** Content */
let contentMaxWidth = data?.content_max_width;
let snippet = data?.snippet || null;

/** Section */
let sectionPadding = data?.section_padding || "None";
</script>

{#if isFilled.richText(snippet)}
	<div data-items={items?.length > 0 ? items.length : null} class="{(sectionPadding === "None") ? "p-[var(--content-gutter)]" : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div class="richtext w-full mx-auto max-w-[var(--max-width)] overflow-hidden rounded-[var(--border-radius)]" style="--max-width:{(contentMaxWidth && contentMaxWidth >= 300 && contentMaxWidth <= 1600) ? contentMaxWidth + "px" : "100%"};">
			{@html asText(snippet)}
		</div>
	</div>
{/if}