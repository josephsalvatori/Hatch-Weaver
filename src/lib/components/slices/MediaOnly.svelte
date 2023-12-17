<script>
import { client } from "$lib/stores/content";
import inview from "$lib/stores/observer";
import Image from "$lib/components/molecules/Image.svelte";
import Video from "$lib/components/molecules/Video.svelte";
import { staggerFade } from "$js/_helpers/animation";

/**
 * A description
 * @typedef {Object} Slice~MediaOnly
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

/** Media */
let image = (data?.image?.url) ? data.image : null;
let imagePortrait = (data?.image_portrait?.url) ? data.image_portrait : null;
let video = (data?.video?.url) ? data.video : null;
let videoPlayback = data?.video_playback || undefined;
let videoPortrait = (data?.video_portrait?.url) ? data.video_portrait : null;
let videoPlaybackPortrait = data?.video_portrait_playback || undefined;
let mediaFit = data?.media_fit || "Cover";
let mediaAspectRatio = (data?.media_aspect_ratio) ? data.media_aspect_ratio.toLowerCase() : "none";
let mediaRoundCorners = data?.media_round_corners || false;
let mediaHeight = image?.dimensions?.height || video?.dimensions?.height || 900;
let mediaWidth = image?.dimensions?.width || video?.dimensions?.width || 1600;
let mediaHeightPortrait = imagePortrait?.dimensions?.height || videoPortrait?.dimensions?.height || 1600;
let mediaWidthPortrait = imagePortrait?.dimensions?.width || videoPortrait?.dimensions?.width || 900;
let mediaPortraitMobile = data?.force_portrait_mobile || true;

/** Section */
let sectionPadding = data?.section_padding || "None";

$: aspectRatio = `${(mediaFit !== "Cover") ? (mediaWidth / 100) + "/" + (mediaHeight / 100) : (elWidth / 100) + "/" + ((windowHeight - (sectionPadding === "None" ? $client.headerHeight : $client.headerHeight * 2)) / 100)}`;
$: aspectRatioPortrait = `${(mediaFit !== "Cover" || mediaWidthPortrait) ? (mediaWidthPortrait / 100) + "/" + (mediaHeightPortrait / 100) : (windowWidth / 100) + "/" + (windowHeight / 100)}`;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}></svelte:window>

{#if image || imagePortrait || video || videoPortrait}
	<div class="relative h-full" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		{#if mediaPortraitMobile && (imagePortrait || videoPortrait) && elWidth < 768}
			<div data-items={items?.length > 0 ? items.length : null} bind:clientWidth={elWidth} class="media relative min-h-full w-full overflow-hidden aspect-[var(--aspect)] h-full flex items-center justify-center {sectionPadding.toLowerCase() !== "none" || mediaRoundCorners ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{(mediaAspectRatio ? mediaAspectRatio.replace(":", "/") : aspectRatioPortrait)};">
				{#if videoPortrait}
					<Video src={videoPortrait.url.replace("http://", "https://")} fit={mediaFit.toLowerCase()} playback={videoPlayback} />
				{/if}
				{#if imagePortrait && !videoPortrait}
					<Image src={imagePortrait.url} fit={mediaFit.toLowerCase()} height={imagePortrait.dimensions.height} width={imagePortrait.dimensions.width} alt={imagePortrait.alt} />
				{/if}
			</div>
		{:else if windowWidth > 0}
			{@const imageFallback = (image) ? image : imagePortrait}
			{@const videoFallback = (video) ? video : videoPortrait}
			<div data-items={items?.length > 0 ? items.length : null} bind:clientWidth={elWidth} class="media relative min-h-full w-full overflow-hidden aspect-[var(--aspect)] h-full flex items-center justify-center {sectionPadding.toLowerCase() !== "none" ? "rounded-[var(--border-radius)]" : ""}" style="--aspect:{(mediaAspectRatio ? mediaAspectRatio.replace(":", "/") : aspectRatio)};">
				{#if videoFallback}
					<Video src={videoFallback.url.replace("http://", "https://")} fit={mediaFit.toLowerCase()} playback={videoPlaybackPortrait} />
				{/if}
				{#if imageFallback && !videoFallback}
					<Image src={imageFallback.url} fit={mediaFit.toLowerCase()} height={imageFallback.dimensions.height} width={imageFallback.dimensions.width} alt={imageFallback.alt} />
				{/if}
			</div>
		{/if}
	</div>
{/if}