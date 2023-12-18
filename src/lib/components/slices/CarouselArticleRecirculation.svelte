<script>
import inview from "$lib/stores/observer";
import CardArticle from "$lib/components/modules/CardArticle.svelte";
import PlaceholderArticle from "$lib/components/modules/PlaceholderArticle.svelte";
import Button from "$lib/components/molecules/Button.svelte";
import Carousel from "$lib/components/slots/Carousel.svelte";
import Grid from "$lib/components/slots/Grid.svelte";
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

/** Fetch dynamic data */
const contentData = async (type, params = {}) => {

	if(!type) return undefined;

	let queryString = Object.keys(params).map(k => `${k}=${params[k]}`).join("&");
	/** Split */

	let data = await fetch(`/api/v1/content?type=${type}${(queryString) ? "&" + queryString : ""}`, {
		method: "GET",
		headers: {
			"Accept": "application/json"
		}
	}).catch(err => {
		console.log(`ERROR -- collection POST ~ ${handle}`, err.message);
	});

	let response = await data.json();

	if(data.ok) {
		return response;
	} else {
		return undefined;
	}
};

/** Content */
let eyebrow = data?.eyebrow || null;
let content = data?.content || [];
let buttonLink = data?.button_link?.url || null;
let buttonText = data?.button_text || "Learn More";
let buttonStyle = data?.button_style || "";
let contentBoxFontColor = (data?.content_box_font_color) ? refs.colors[slugify(data.content_box_font_color)] : null;
let contentBoxBackgroundColor = (data?.content_box_background_color) ? refs.colors[slugify(data.content_box_background_color)] : null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentMaxWidth = data?.content_max_width;
let contentFlex = data?.section || null;
let contentType = (contentFlex?.type === "category") ? "article" : null;

/** Carousel */
let carouselPages = data?.content_pages || 5;
let columnAlignment = data?.column_alignment || "Fill";
let columnCount = data?.content_per_page || 3;

/** Active Functions */
let cnt = [...Array(columnCount).keys()];
let elWidth;
let maxSlides = carouselPages * columnCount;
let promise;
// TODO: Make these filters more dynamic
if(isFilled.contentRelationship(contentFlex)) {

	promise = contentData(contentType, {
		filter: contentFlex?.type,
		filterBy: contentFlex?.id
	});
}
</script>

{#if isFilled.contentRelationship(contentFlex)}
	<div class="relative w-full" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div data-items={items?.length > 0 ? items.length : null} class="flex items-end justify-between mb-[var(--site-gutter)] {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
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
		<div bind:clientWidth={elWidth} class="w-full">
			{#await promise}
				<Grid max={columnCount}>
					{#each cnt as itm}
						<PlaceholderArticle />
					{/each}
				</Grid>
			{:then response}
				{@const articles = response?.data}
				<Carousel items={articles} alignment={columnAlignment} effect={"slide"} overflow={true} params={{
					loop: false,
					slidesPerView: 1,
					breakpoints: {
						640: {
							slidesPerView: (columnCount < 2) ? columnCount : 2
						},
						1024: {
							slidesPerView: (columnCount < 3) ? columnCount : 3
						},
						1440: {
							slidesPerView: (columnCount < 4) ? columnCount : 4
						},
						1680: {
							slidesPerView: (columnCount < 5) ? columnCount : 5
						}
					}
				}}>
					{#each articles as article, i}
						{#if i <= maxSlides}
							<swiper-slide class="h-auto">
								<CardArticle article={article} />
							</swiper-slide>
						{/if}
					{/each}
				</Carousel>
			{/await}
		</div>
	</div>
{/if}