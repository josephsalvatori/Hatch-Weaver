<script>
import inview from "$lib/stores/observer";
import Button from "$lib/components/molecules/Button.svelte";
import Carousel from "$lib/components/slots/Carousel.svelte";
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";
import { asHTML, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

/**
 * Slice
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

/** Content */
let buttonLink = data?.button_link?.url || null;
let buttonStyle = data?.button_style || "";
let buttonText = data?.button_text || "Learn More";
let content = data?.content || [];
let contentBoxFontColor = (data?.content_box_font_color) ? refs.colors[slugify(data.content_box_font_color)] : null;
let contentBoxBackgroundColor = (data?.content_box_background_color) ? refs.colors[slugify(data.content_box_background_color)] : null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentFlex = data?.section?.data?.slices || [];
let contentMaxWidth = data?.content_max_width;
let eyebrow = data?.eyebrow || null;

/** Carousel */
let carouselPages = data?.content_pages || 5;
let columnAlignment = data?.column_alignment || "Fill";
let columnCount = data?.content_per_page || 3;

/** Active Variables */
let maxSlides = carouselPages * columnCount;
</script>

{#if isFilled.sliceZone(contentFlex) || isFilled.richText(content) || eyebrow}
	<div class="relative w-full {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		{#if isFilled.richText(content) || eyebrow || buttonLink}
			<div data-items={items?.length > 0 ? items.length : null} class="flex items-end justify-between mb-[var(--site-gutter)]">
				<div class="flex-grow richtext max-w-[var(--max-width)] w-full {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}" style="--max-width:{(contentMaxWidth && contentMaxWidth >= 300 && contentMaxWidth <= 1600) ? contentMaxWidth + "px" : "100%"};">
					{#if eyebrow}
						<p class="eyebrow">{eyebrow}</p>
					{/if}
					{@html asHTML(content)}
				</div>
				{#if buttonLink}
					<div class="inline-flex justify-end richtext">
						<Button href={buttonLink} style={buttonStyle}>{buttonText}</Button>
					</div>
				{/if}
			</div>
		{/if}
		{#if typeof contentFlex === "object" && contentFlex.length > 1}
			<Carousel items={contentFlex} alignment={columnAlignment} effect={"slide"} overflow={true} params={{
				loop: false,
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 0,
				breakpoints: {
					640: {
						slidesPerView: (columnCount < 2) ? columnCount : 2,
						slidesPerGroup: (columnCount < 2) ? columnCount : 2
					},
					1024: {
						slidesPerView: (columnCount < 3) ? columnCount : 3,
						slidesPerGroup: (columnCount < 3) ? columnCount : 3
					},
					1440: {
						slidesPerView: (columnCount < 4) ? columnCount : 4,
						slidesPerGroup: (columnCount < 4) ? columnCount : 4
					},
					1680: {
						slidesPerView: (columnCount < 5) ? columnCount : 5,
						slidesPerGroup: (columnCount < 5) ? columnCount : 5
					}
				}
			}}>
				{#each contentFlex as slice, i}
					{#if i <= maxSlides}
						<swiper-slide class="h-auto">
							<SliceSwitch slice={slice} index={i} />
						</swiper-slide>
					{/if}
				{/each}
			</Carousel>
		{:else}
			<!-- TODO: Should we output a single slide into a Grid section? -->
		{/if}
	</div>
{/if}