<script>
import { client } from "$lib/stores/content";
import inview from "$lib/stores/observer";
import Image from "$lib/components/molecules/Image.svelte";
import Video from "$lib/components/molecules/Video.svelte";
import Accordion from "$lib/components/slots/Accordion.svelte";
import { asHTML, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";

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
let inViewInit = ({ detail, node }) => { animation = staggerFade(detail.node.children); animation.init(); };
let inViewChange = ({ detail }) => isInView = detail?.inView;
let inViewAnimate = ({ detail }) => animation.run();

/** Defaults */
let elWidth = 0;
let windowHeight = 0;
let windowWidth = 0;

/** Layout */
let desktopLayout = data?.section_desktop_layout || "Image Left";
let mobileLayout = data?.section_mobile_layout || "Image Top";

/** Content */
let eyebrow = data?.eyebrow || null;
let content = data?.content || [];
let contentBoxFontColor = data?.content_box_font_color || null;
let contentBoxBackgroundColor = data?.content_box_background_color || null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentBoxHorizontal = data?.content_box_horizontal || "Left";
let contentBoxVertical = data?.content_box_vertical || "Top";

/** Media */
let image = (data?.image?.url) ? data.image : null;
let video = (data?.video?.url) ? data.video : null;
let mediaFit = data?.media_fit || "Cover";
let mediaHeight = image?.dimensions?.height || video?.dimensions?.height || 1000;
let mediaWidth = image?.dimensions?.width || video?.dimensions?.width || 1000;

/** Section */
let sectionPadding = data?.section_padding || "None";

/** Display Checks */
let hasItems = items.reduce((count, v) => count + (isFilled.richText(v.faq_title) || isFilled.richText(v.faq_details)), 0);

$: documentHeight = (windowHeight - (sectionPadding === "None" ? $client.headerHeight : $client.headerHeight * 2));
$: aspectRatio = `${(mediaFit !== "Cover") ? (mediaWidth / 100) + "/" + (mediaHeight / 100) : (elWidth >= 768 && documentHeight > mediaHeight ? windowWidth / 200 : 1) + "/" + (elWidth >= 768 && documentHeight > mediaHeight ? documentHeight / 100 : 1)}`;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}></svelte:window>

{#if (isFilled.group(items) && hasItems > 0) || isFilled.richText(content) || eyebrow || video || image}
	<div bind:clientWidth={elWidth} class="grid w-full {elWidth >= 768 ? "grid-cols-2" : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div class="media relative overflow-hidden w-full {mediaFit === "Cover" ? "aspect-[var(--aspect)]" : "h-full"} {elWidth >= 768 && desktopLayout !== "Image Left" ? "md:row-start-1 md:col-start-2" : ""} {elWidth < 768 && mobileLayout !== "Image Top" ? "row-start-2 col-start-1" : ""} {sectionPadding.toLowerCase() !== "none" ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{aspectRatio};">
			{#if video}
				<Video src={video.url} fit={mediaFit.toLowerCase()} />
			{/if}
			{#if image && !video}
				<Image src={image.url} fit={mediaFit.toLowerCase()} height={image.dimensions.height} width={image.dimensions.width} alt={image.alt} />
			{/if}
		</div>
		{#if elWidth >= 768}
			<div class="flex w-full {sectionPadding === "All" || sectionPadding === "Right" || sectionPadding === "Left + Right" ? "p-[var(--content-gutter)] dk:pl-[var(--site-gutter)]" : "p-[var(--content-gutter)] dk:p-[var(--site-gutter)]"} {(contentBoxVertical === "Bottom") ? "items-end" : (contentBoxVertical === "Center") ? "items-center" : ""} {(contentBoxHorizontal === "Right") ? "justify-end" : (contentBoxHorizontal === "Center") ? "justify-center" : ""} {elWidth >= 768 && desktopLayout !== "Image Left" ? "md:col-start-1 md:row-start-1" : ""} {elWidth < 768 && mobileLayout !== "Image Top" ? "row-start-1 col-start-1" : ""}">
				<div class="w-full {(contentBoxBackgroundColor) ? "p-[var(--content-spacing)] bg-[var(--background-color)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
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
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}