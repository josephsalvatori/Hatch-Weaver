<script>
import inview from "$lib/stores/observer";
import Button from "$lib/components/molecules/Button.svelte";
import { asHTML, isFilled } from "@prismicio/helpers";
import { staggerFadeIn } from "$js/_helpers/animation";
import { richTextSerializer } from "$js/_helpers/strings";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

/**
 * A description
 * @typedef {Object} Slice~Richtext
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
let inViewInit = ({ detail, node }) => { animation = staggerFadeIn(detail.node.children, { to: { duration: 1.5 }}); animation.init(); };
let inViewChange = ({ detail }) => isInView = detail?.inView;
let inViewAnimate = ({ detail }) => animation.run();

/** Content */
let eyebrow = data?.eyebrow || null;
let content = data?.content || [];
let buttonLink = data?.button_link?.url || null;
let buttonText = data?.button_text || "Learn More";
let buttonStyle = data?.button_style || "";
let contentBoxFontColor = (data?.content_box_font_color) ? refs.colors[slugify(data.content_box_font_color)] : null;
let contentBoxBackgroundColor = (data?.section_background_color) ? refs.colors[slugify(data.section_background_color)] : null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentBoxHorizontal = data?.content_box_horizontal || "Left";
let contentBoxVertical = data?.content_box_vertical || "Top";
let contentMaxWidth = data?.content_max_width;

/** Section */
let sectionPadding = data?.section_padding || "None";
</script>

{#if isFilled.richText(content) || eyebrow}
	<div data-items={items?.length > 0 ? items.length : null} class="w-full min-h-full relative flex {(sectionPadding === "None" && contentBoxBackgroundColor) ? "rounded-[var(--border-radius)] overflow-hidden" : "block"} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""} {(contentBoxVertical === "Bottom") ? "items-end" : (contentBoxVertical === "Center") ? "items-center" : ""} {(contentBoxHorizontal === "Right") ? "justify-end" : (contentBoxHorizontal === "Center") ? "justify-center" : ""}" style="{(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div class="richtext w-full max-w-[var(--max-width)] {(sectionPadding === "None" && contentBoxBackgroundColor) ? "p-[var(--content-gutter)]" : ""} {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}" style="--max-width:{(contentMaxWidth && contentMaxWidth >= 300 && contentMaxWidth <= 1600) ? contentMaxWidth + "px" : "100%"};">
			{#if eyebrow}
				<p class="eyebrow">{eyebrow}</p>
			{/if}
			{@html asHTML(content, null, richTextSerializer)}
			{#if buttonLink}
				<Button href={buttonLink} style={buttonStyle}>{buttonText}</Button>
			{/if}
		</div>
	</div>
{/if}