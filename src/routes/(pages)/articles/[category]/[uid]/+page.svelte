<script>
import { client } from "$lib/stores/content";
import inview from "$lib/stores/observer";
import Debug from "$lib/components/Debug.svelte";
import Image from "$lib/components/molecules/Image.svelte";
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";
import { asHTML, asText, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";
import { refs } from "$js/_helpers/refs";
import Scroller from "@sveltejs/svelte-scroller";
import { ChevronRightIcon } from "svelte-feather-icons";

/** @type {import('./$types').PageData} */
export let data;

/**
 * Observer
 * use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_enter={inViewEnter} on:inview_init={inViewInit}
 */
let animation;
let isInView = false;
let inViewOptions = {};
let inViewInit = ({ detail, node }) => { animation = staggerFade(detail.node.children); animation.init(); };
let inViewChange = ({ detail }) => isInView = detail?.inView;
let inViewEnter = ({ detail }) => animation.run();

/**
 * Scroller
 */
let progress = 0;
let top = 0;
let threshold = 0.5;
let bottom = 0.9;

$: progressPercent = (progress < 0 ? 0 : (progress > 1 ? 100 : progress * 100));

/** Defaults */
let elWidth = 0;
let windowHeight = 0;
let windowWidth = 0;

/** Content */
let eyebrow = data?.page?.data?.eyebrow || null;
let content = data?.page?.data?.content || [];
let buttonLink = data?.page?.data?.button_link?.url || null;
let buttonText = data?.page?.data?.button_text || "Learn More";
let buttonStyle = data?.page?.data?.button_style || "";
let contentBoxFontColor = data?.page?.data?.content_box_font_color || null;
let contentBoxBackgroundColor = data?.page?.data?.content_box_background_color || null;
let contentBoxTextJustification = data?.page?.data?.content_box_text_justification || "Left";
let contentBoxHorizontal = data?.page?.data?.content_box_horizontal || "Left";
let contentBoxVertical = data?.page?.data?.content_box_vertical || "Top";
let contentBreakOnMobile = data?.page?.data?.content_break_mobile || false;

/** Blog */
let author = data?.page?.data?.author || null;
let category = data?.page?.data?.category || null;

/** Media */
let image = (data?.page?.data?.image?.url) ? data.page.data.image : null;
// let video = (data?.page?.data?.video?.url) ? data.video : null;
// let videoPlayback = data?.page?.data?.video_playback || undefined;
let mediaFit = data?.page?.data?.media_fit || "Cover";
let mediaAspectRatio = (data?.page?.data?.media_aspect_ratio) ? data.media_aspect_ratio.toLowerCase() : "1:1";
let mediaRoundCorners = data?.page?.data?.media_round_corners || false;
// let mediaShadow = data?.page?.data?.media_shadow || false;
// let mediaHeight = image?.dimensions?.height || video?.dimensions?.height || 900;
// let mediaWidth = image?.dimensions?.width || video?.dimensions?.width || 1600;

/** Section */
let aspectRatio;
let sectionPadding = data?.page?.data?.section_padding || "None";
let sectionBackgroundColor = data?.page?.data?.section_background_color || null;

$: documentHeight = (windowHeight - ($client.headerHeight * 3));
$: if(mediaAspectRatio !== "none") {
	aspectRatio = `${refs.aspect[mediaAspectRatio]}`;
} else {
	aspectRatio = `${(mediaFit !== "Cover") ? (mediaWidth / 100) + "/" + (mediaHeight / 100) : (elWidth >= 768 && documentHeight > mediaHeight ? windowWidth / 200 : 1) + "/" + (elWidth >= 768 && documentHeight > mediaHeight ? documentHeight / 100 : 1)}`;
}
</script>

<svelte:window bind:innerHeight={windowHeight}></svelte:window>

{#key data.page.id}
	<div class="article-wrapper relative">
		<div class="relative h-full grid tb:grid-cols-2" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_enter={inViewEnter} on:inview_init={inViewInit}>
			<div bind:clientWidth={elWidth} class="aspect-[var(--aspect)] media min-h-full max-h-[var(--max-height)] overflow-hidden relative w-full {sectionPadding.toLowerCase() !== "none" || mediaRoundCorners === true ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{aspectRatio}; --max-height:{documentHeight}px;">
				{#if image}
					<Image src={image.url} fit={mediaFit.toLowerCase()} height={image.dimensions.height} width={image.dimensions.width} alt={image.alt} />
				{/if}
			</div>
			<div class="ca flex h-full left-0 pointer-events-none top-0 w-full z-[2] items-center justify-start">
				<div class="w-full max-w-[800px] {(contentBoxBackgroundColor) ? "p-[var(--content-gutter)] bg-[var(--background-color)] rounded-[var(--border-radius)]" : ""} {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxBackgroundColor) ? `--background-color:${contentBoxBackgroundColor};` : ""} {(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}">
					<div class="richtext pointer-events-auto {(contentBoxTextJustification === "Right") ? "text-right" : (contentBoxTextJustification === "Center") ? "text-center" : "text-left"}">
						{#if category}
							<small class="block">
								<a href="/blog/">Blog</a>
								<span class="inline-flex items-center"><ChevronRightIcon size="10" /></span>
								<a href="/blog/{category?.uid}/">{asText(category.data.title)}</a>
							</small>
						{/if}
						<h1>{asText(data?.page?.data?.title)}</h1>
					</div>
				</div>
			</div>
		</div>
		<div class="bg-[color:var(--border-default-color)] h-[8px] sticky top-[var(--sticky-top)] w-full z-[3]" style="--sticky-top:{$client.headerHeight}px;">
			<span class="bg-[color:var(--theme-color-accent)] flex h-full max-w-full min-w-0" style="width:{progressPercent}%;"></span>
		</div>
		<Scroller {top} {threshold} {bottom} bind:progress>
			<div slot="background" tabindex="-1"></div>
			<div slot="foreground" class="ca richtext">
				<div class="flex flex-col justify-between tb:flex-row tb:px-[var(--site-gutter)]">
					<div class="richtext max-w-[1100px] w-full tb:pr-[var(--site-gutter)]">
						{@html asHTML(content)}
					</div>
					<div class="min-w-[300px] relative">
						<div class="border-2 sticky top-[var(--sticky-top)]" style="--sticky-top:{$client.headerHeight + 38}px;">
							Recirculation
						</div>
					</div>
				</div>
			</div>
		</Scroller>
	</div>
	{#each data.page.data.slices as section, i}
		<SliceSwitch slice={section} index={i} />
	{/each}
{/key}