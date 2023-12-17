<script>
import inview from "$lib/stores/observer";
import Accordion from "$lib/components/slots/Accordion.svelte";
import { asHTML, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";

/**
 * A description
 * @typedef {Object} Slice~Richtext
 * @param {Object} data slice non-repeatable fields
 * @param {Object} items slice non-repeatable fields
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

/** Defaults */
let elWidth = 0;

/** Content */
let eyebrow = data?.eyebrow || null;
let content = data?.content || [];
let contentBoxFontColor = data?.content_box_font_color || null;
let contentBoxBackgroundColor = data?.content_box_background_color || null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentBoxHorizontal = data?.content_box_horizontal || "Left";
let contentBoxVertical = data?.content_box_vertical || "Top";
let contentMaxWidth = data?.content_max_width;

/** Section */
let sectionPadding = data?.section_padding || "None";

/** Display Checks */
let hasItems = items.reduce((count, v) => count + (isFilled.richText(v.faq_title) || isFilled.richText(v.faq_details)), 0);
</script>

{#if (isFilled.group(items) && hasItems > 0) || isFilled.richText(content) || eyebrow}
	<div class="w-full min-h-full flex {(sectionPadding === "None" || contentBoxBackgroundColor) ? "p-[var(--content-gutter)]" : ""} {(contentBoxBackgroundColor) ? "bg-[var(--background-color)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""} {(contentBoxVertical === "Bottom") ? "items-end" : (contentBoxVertical === "Center") ? "items-center" : ""} {(contentBoxHorizontal === "Right") ? "justify-end" : (contentBoxHorizontal === "Center") ? "justify-center" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div class="richtext w-full max-w-[var(--max-width)] {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}" style="--max-width:{(contentMaxWidth && contentMaxWidth >= 300 && contentMaxWidth <= 1600) ? contentMaxWidth + "px" : "100%"};">
			{#if eyebrow}
				<p class="eyebrow">{eyebrow}</p>
			{/if}
			{@html asHTML(content)}
			{#if isFilled.group(items)}
				<div class="accordion-wrapper mt-[var(--content-gap)]">
					{#each items as item}
						{#if isFilled.richText(item.faq_title) && isFilled.richText(item.faq_details)}
							<Accordion title={item.faq_title}>
								{@html asHTML(item.faq_details)}
							</Accordion>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}