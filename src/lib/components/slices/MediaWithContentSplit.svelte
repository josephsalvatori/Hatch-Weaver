<script>
import { client } from "$lib/stores/content";
import inview from "$lib/stores/observer";
import Button from "$lib/components/molecules/Button.svelte";
import Image from "$lib/components/molecules/Image.svelte";
import Video from "$lib/components/molecules/Video.svelte";
import { asHTML, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";
import { refs } from "$js/_helpers/refs";

/**
 * A description
 * @typedef {Object} Slice~MediaWithContentSplit
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

/** Layout */
let desktopLayout = data?.section_desktop_layout || "Image Left";
let mobileLayout = data?.section_mobile_layout || "Image Top";

/** Content */
let eyebrow = data?.eyebrow || null;
let content = data?.content || [];
let buttonLink = data?.button_link?.url || null;
let buttonText = data?.button_text || "Learn More";
let buttonStyle = data?.button_style || "";
let contentBoxFontColor = data?.content_box_font_color || null;
let contentBoxBackgroundColor = data?.content_box_background_color || null;
let contentBoxTextJustification = data?.content_box_text_justification || "Left";
let contentBoxHorizontal = data?.content_box_horizontal || "Left";
let contentBoxVertical = data?.content_box_vertical || "Top";
let forceMobileBreak = data?.content_break_mobile || false;

/** Media */
let image = (data?.image?.url) ? data.image : null;
let video = (data?.video?.url) ? data.video : null;
let videoPlayback = data?.video_playback || undefined;
let mediaFit = data?.media_fit || "Cover";
let mediaPosition = data?.media_position || "Center";
let mediaAspectRatio = (data?.media_aspect_ratio) ? data.media_aspect_ratio.toLowerCase() : "none";
let mediaRoundCorners = data?.media_round_corners || false;
let mediaHeight = image?.dimensions?.height || video?.dimensions?.height || 1000;
let mediaWidth = image?.dimensions?.width || video?.dimensions?.width || 1000;

/** Section */
let aspectRatio;
let sectionPadding = data?.section_padding || "None";

$: documentHeight = (windowHeight - (sectionPadding === "None" ? $client.headerHeight : $client.headerHeight * 2));
$: if(mediaAspectRatio !== "none") {
	aspectRatio = `${refs.aspect[mediaAspectRatio]}`;
} else {
	aspectRatio = `${(mediaFit !== "Cover") ? (mediaWidth / 100) + "/" + (mediaHeight / 100) : (elWidth >= 768 && documentHeight < mediaHeight ? windowWidth / 200 : 1) + "/" + (elWidth >= 768 && documentHeight < mediaHeight ? documentHeight / 100 : 1)}`;
}
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}></svelte:window>

{#if isFilled.richText(content) || isFilled.link(data.button_link) || eyebrow || video || image}
	<div data-items={items?.length > 0 ? items.length : null} bind:clientWidth={elWidth} class="grid min-h-full w-full {elWidth >= 768 && !forceMobileBreak ? "grid-cols-2" : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<div class="media relative overflow-hidden w-full min-h-full aspect-[var(--aspect)] {elWidth >= 768 && desktopLayout !== "Image Left" ? "md:row-start-1 md:col-start-2" : ""} {elWidth < 768 && mobileLayout !== "Image Top" ? "row-start-2 col-start-1" : ""} {sectionPadding.toLowerCase() !== "none" || mediaRoundCorners === true ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{aspectRatio};">
			{#if video}
				<Video src={video.url.replace("http://", "https://")} fit={mediaFit.toLowerCase()} playback={videoPlayback} />
			{/if}
			{#if image && !video}
				<Image src={image.url} fit={mediaFit.toLowerCase()} height={image.dimensions.height} width={image.dimensions.width} position={mediaPosition} alt={image.alt} />
			{/if}
		</div>
		{#if elWidth >= 768}
			<div class="relative w-full {desktopLayout !== "Image Left" ? "col-start-1 row-start-1" : ""}">
				<div class="flex h-full w-full {(sectionPadding === "None" || contentBoxBackgroundColor) ? "p-[var(--site-gutter)]" : (desktopLayout === "Image Left" ? "pl-[var(--site-gutter)]" : "pr-[var(--site-gutter)]")} {(contentBoxBackgroundColor) ? "bg-[var(--background-color)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""} {(contentBoxVertical === "Bottom") ? "items-end" : (contentBoxVertical === "Center") ? "items-center" : ""} {(contentBoxHorizontal === "Right") ? "justify-end" : (contentBoxHorizontal === "Center") ? "justify-center" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
					<div class="richtext {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"} w-full">
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
			<div class="relative w-full {mobileLayout !== "Image Top" ? "row-start-1 col-start-1" : ""}">
				<div class="{(sectionPadding === "None" || contentBoxBackgroundColor) ? "p-[var(--content-gutter)]" : (mobileLayout === "Image Top" ? "pt-[var(--content-gutter)]" : "pb-[var(--content-gutter)]")} {(contentBoxBackgroundColor) ? "bg-[var(--background-color)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
					<div class="richtext {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}">
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
	</div>
{/if}