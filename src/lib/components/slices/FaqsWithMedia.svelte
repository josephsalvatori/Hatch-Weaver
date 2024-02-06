<script>
import { client } from "$lib/stores/content";
import inview from "$lib/stores/observer";
import Button from "$lib/components/molecules/Button.svelte";
import Image from "$lib/components/molecules/Image.svelte";
import Video from "$lib/components/molecules/Video.svelte";
import Accordion from "$lib/components/slots/Accordion.svelte";
import { asHTML, asText, isFilled } from "@prismicio/helpers";
import { staggerFadeIn } from "$js/_helpers/animation";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";
import { Parallax, ParallaxLayer } from "svelte-parallax";

/**
 * A description
 * @typedef {Object} Slice~MediaWithContentSplit
 * @param {Object} data slice non-repeatable fields
 * @param {Object} items slice repeatable fields
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

/** Defaults */
let elHeight = 0;
let elWidth = 0;
let windowHeight = 0;
let windowWidth = 0;

/** Layout */
let desktopLayout = data?.section_desktop_layout || "Image Left";
let mobileLayout = data?.section_mobile_layout || "Image Top";

/** Content */
let eyebrow = data?.eyebrow || null;
let content = data?.content || [];
let buttonLink = data?.button_link?.url || null;
let buttonText = data?.button_text || "Learn More";
let buttonStyle = data?.button_style || "";
let contentBoxFontColor = (data?.content_box_font_color) ? refs.colors[slugify(data.content_box_font_color)] : null;
let contentBoxBackgroundColor = (data?.content_box_background_color) ? refs.colors[slugify(data.content_box_background_color)] : null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentBoxHorizontal = data?.content_box_horizontal || "Left";
let contentBoxVertical = data?.content_box_vertical || "Top";
let forceMobileBreak = data?.content_break_mobile || false;

/** Media */
let image = (data?.image?.url) ? data.image : null;
let video = (data?.video?.url) ? data.video : null;
let mediaFit = data?.media_fit || "Cover";
let mediaPosition = data?.media_position || "Center";
let mediaAspectRatio = (data?.media_aspect_ratio) ? data.media_aspect_ratio.toLowerCase() : "none";
let mediaHeight = image?.dimensions?.height || video?.dimensions?.height || 1000;
let mediaWidth = image?.dimensions?.width || video?.dimensions?.width || 1000;
let mediaRoundCorners = data?.media_round_corners || false;

/** Section */
let mediaElHeight = 0;
let sectionPadding = data?.section_padding || "None";

/** Display Checks */
let hasItems = items.reduce((count, v) => count + (isFilled.richText(v.faq_title) || isFilled.richText(v.faq_details)), 0);

$: documentHeight = (windowHeight - (sectionPadding === "None" ? $client.headerHeight : $client.headerHeight * 2));
$: aspectRatio = `${(mediaFit !== "Cover") ? (mediaWidth / 100) + "/" + (mediaHeight / 100) : (elWidth >= 768 && documentHeight > mediaHeight ? windowWidth / 200 : 1) + "/" + (elWidth >= 768 && documentHeight > mediaHeight ? documentHeight / 100 : 1)}`;

$: mediaScrollOffset = (1 - ((mediaElHeight / elHeight) || 0.5)) / 2;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}></svelte:window>

{#if (isFilled.group(items) && hasItems > 0) || isFilled.richText(content) || eyebrow || video || image}
	<div data-items={items?.length > 0 ? items.length : null} bind:clientWidth={elWidth} bind:clientHeight={elHeight} class="flex min-h-full w-full {elWidth >= 768 && !forceMobileBreak ? `${desktopLayout !== "Image Left" ? "flex-row-reverse" : "flex-row"}` : "flex-column"}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div class="min-h-full w-full basis-[36%] flex-grow-0 flex-shrink-0">
			<Parallax sections={1} sectionHeight={elHeight} threshold={{ top: 0, bottom: 0 }} config={{}}>
				<ParallaxLayer rate={-mediaScrollOffset / 2} offset={mediaScrollOffset}>
					<div bind:clientHeight={mediaElHeight} class="media relative overflow-hidden w-full aspect-[var(--aspect)] {sectionPadding.toLowerCase() !== "none" || mediaRoundCorners === true ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{aspectRatio};">
						{#if video}
							<Video src={video.url} fit={mediaFit.toLowerCase()} />
						{/if}
						{#if image && !video}
							<Image src={image.url} fit={mediaFit.toLowerCase()} height={image.dimensions.height} width={image.dimensions.width} alt={image.alt} />
						{/if}
					</div>
				</ParallaxLayer>
			</Parallax>
		</div>
		{#if elWidth >= 768}
			<div class="relative w-full basis-[64%] {desktopLayout !== "Image Left" ? "pr-[var(--content-gap)]" : "pl-[var(--content-gap)]"}">
				<div class="flex h-full w-full {(sectionPadding === "None" || contentBoxBackgroundColor) ? "p-[var(--content-gutter)]" : (desktopLayout === "Image Left" ? "pl-[var(--site-gutter)]" : "pr-[var(--site-gutter)]")} {(contentBoxBackgroundColor) ? "bg-[var(--background-color)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""} {(contentBoxVertical === "Bottom") ? "items-end" : (contentBoxVertical === "Center") ? "items-center" : ""} {(contentBoxHorizontal === "Right") ? "justify-end" : (contentBoxHorizontal === "Center") ? "justify-center" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
					<div class="richtext {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"} w-full">
						{#if eyebrow}
							<p class="eyebrow">{eyebrow}</p>
						{/if}
						{@html asHTML(content)}
						{#if isFilled.group(items)}
							<div class="accordion-wrapper mt-[var(--content-gap)]">
								{#each items as item}
									<Accordion title={asText(item.faq_title)}>
										{@html asHTML(item.faq_details)}
									</Accordion>
								{/each}
							</div>
						{/if}
						{#if buttonLink}
							<Button href={buttonLink} style={buttonStyle}>{buttonText}</Button>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="relative min-h-full w-full {mobileLayout !== "Image Top" ? "row-start-1 col-start-1 pb-[var(--content-gutter)]" : "pt-[var(--content-gutter)]"}">
				<div class="{(sectionPadding === "None" || contentBoxBackgroundColor) ? "p-[var(--content-gutter)]" : ""} {(contentBoxBackgroundColor) ? "bg-[var(--background-color)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
					<div class="richtext {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}">
						{#if eyebrow}
							<p class="eyebrow">{eyebrow}</p>
						{/if}
						{@html asHTML(content)}
						{#if isFilled.group(items)}
							<div class="accordion-wrapper mt-[var(--content-gap)]">
								{#each items as item}
									<Accordion title={item.faq_title}>
										{@html asHTML(item.faq_details)}
									</Accordion>
								{/each}
							</div>
						{/if}
						{#if buttonLink}
							<Button href={buttonLink} style={buttonStyle}>{buttonText}</Button>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}