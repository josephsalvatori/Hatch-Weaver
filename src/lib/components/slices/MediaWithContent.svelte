<script>
import { client } from "$lib/stores/content";
import inview from "$lib/stores/observer";
import Button from "$lib/components/molecules/Button.svelte";
import Image from "$lib/components/molecules/Image.svelte";
import Video from "$lib/components/molecules/Video.svelte";
import { asHTML, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

/**
 * A description
 * @typedef {Object} Slice~MediaWithContent
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

/** Defaults */
let elWidth = 0;
let windowHeight = 0;
let windowWidth = 0;

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
let contentBreakOnMobile = data?.content_break_mobile || false;

/** Media */
let image = (data?.image?.url) ? data.image : null;
let video = (data?.video?.url) ? data.video : null;
let videoPlayback = data?.video_playback || undefined;
let mediaFit = data?.media_fit || "Cover";
let mediaAspectRatio = (data?.media_aspect_ratio) ? data.media_aspect_ratio.toLowerCase() : "none";
let mediaRoundCorners = data?.media_round_corners || false;
let mediaShadow = data?.media_shadow || false;
let mediaHeight = image?.dimensions?.height || video?.dimensions?.height || 900;
let mediaWidth = image?.dimensions?.width || video?.dimensions?.width || 1600;

/** Section */
let aspectRatio;
let sectionPadding = data?.section_padding || "None";
let sectionBackgroundColor = data?.section_background_color || null;

$: if(mediaAspectRatio !== "none") {
	aspectRatio = `${refs.aspect[mediaAspectRatio]}`;
} else {
	aspectRatio = `${(mediaFit !== "Cover") ? (mediaWidth / 100) + "/" + (mediaHeight / 100) : (elWidth >= 768 ? elWidth / 100 : 1) + "/" + (elWidth >= 768 ? (windowHeight - (sectionPadding === "None" ? $client.headerHeight : $client.headerHeight * 2)) / 100 : 1)}`;
}
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}></svelte:window>

{#if isFilled.richText(content) || isFilled.link(data.button_link) || eyebrow || video || image}
	<div class="relative h-full" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div bind:clientWidth={elWidth} class="aspect-[var(--aspect)] media min-h-full overflow-hidden relative w-full {sectionPadding.toLowerCase() !== "none" || mediaRoundCorners === true ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{aspectRatio};">
			{#if video}
				<Video src={video.url.replace("http://", "https://")} fit={mediaFit.toLowerCase()} playback={videoPlayback} />
			{/if}
			{#if image && !video}
				<Image src={image.url} fit={mediaFit.toLowerCase()} height={image.dimensions.height} width={image.dimensions.width} alt={image.alt} />
			{/if}
			{#if mediaShadow}
				<div class="absolute top-0 left-0 w-full h-full bg-black/25 pointer-events-none"></div>
			{/if}
		</div>
		{#if (eyebrow || content.length > 0 || buttonLink) && elWidth > 0}
			{#if contentBreakOnMobile === false || elWidth >= 768}
				<div data-items={items?.length > 0 ? items.length : null} class="absolute ca flex h-full left-0 pointer-events-none top-0 w-full z-[2] {(contentBoxVertical.toLowerCase() === "bottom") ? "items-end" : (contentBoxVertical.toLowerCase() === "center") ? "items-center" : "items-start"} {(contentBoxHorizontal === "Right") ? "justify-end" : (contentBoxHorizontal === "Center") ? "justify-center" : ""}">
					<div class="w-full max-w-[800px] {(contentBoxBackgroundColor) ? "p-[var(--content-gutter)] bg-[var(--background-color)] rounded-[var(--border-radius)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
						<div class="richtext pointer-events-auto {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}">
							{#if eyebrow}
								<p class="eyebrow">{eyebrow}</p>
							{/if}
							{@html asHTML(content)}
							{#if buttonLink}
								<Button href={buttonLink} style={buttonStyle}>{buttonText}</Button>
							{/if}
						</div>
					</div>
				</div>
			{:else}
				<div data-items={items?.length > 0 ? items.length : null} class="relative w-full">
					<div class="{(sectionPadding === "None" || contentBoxBackgroundColor) ? "p-[var(--content-gutter)]" : "ca"} pointer-events-none {(contentBoxBackgroundColor && contentBoxFontColor) ? "bg-[var(--background-color)] text-[color:var(--content-color)]" : ""}" style="{(contentBoxBackgroundColor && contentBoxFontColor) ? `--background-color: ${contentBoxBackgroundColor}; --content-color: ${contentBoxFontColor};` : ""}">
						<div class="richtext pointer-events-auto {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}">
							{#if eyebrow}
								<p class="eyebrow">{eyebrow}</p>
							{/if}
							{@html asHTML(content)}
							{#if buttonLink}
								<Button href={buttonLink} style={buttonStyle}>{buttonText}</Button>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		{/if}
	</div>
{/if}