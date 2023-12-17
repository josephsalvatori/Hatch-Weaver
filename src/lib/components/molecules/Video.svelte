<script>
/**
 * @fileOverview responsive image descriptions
 * @module
 * @typedef {Object} Components~ResponsiveVideo
 */
import { fade } from "svelte/transition";
import { page } from "$app/stores";
import { onMount } from "svelte";
import { storage } from "$lib/stores/storage";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";
import LazyLoad from "vanilla-lazyload";

export let fit = "cover";
export let src;
export let backup = null;
export let active = false;
export let playback = "none";
// export let showFullControls = false;

let pb = refs.playback[slugify(playback)];

let autoplay = ($page.data.userAgent.indexOf("chrome-lighthouse") > -1) ? false : pb.autoplay;
let delay = 500;
let loop = pb.loop;
let interval;
let el;

let showMuteUnmute;
let showPlayPause;

/** Bindings */
let currentTime;
let duration;
let muted = true;
let readyState = 0;
let videoWidth = 0;
let videoHeight = 0;
let volume = 0.75;

/** Events */
$: if(readyState === 4) {

	if(active ? el.play() : el.pause());
	if(autoplay) setTimeout(() => el.play(), delay);
	if(el.mozHasAudio || Boolean(el.webkitAudioDecodedByteCount) || Boolean(el.audioTracks && el.audioTracks.length)) showMuteUnmute = true;
};

const returnMimeType = (url) => {

	if(url.indexOf(".mp4")) return "video/mp4";
	if(url.indexOf(".webm")) return "video/webm";

	return;
};

onMount(() => {

	if(!$storage.lazyLoad){
		$storage.lazyLoad = new LazyLoad({
			threshold: 1600,
			callback_loaded: (el) => {
				el.style.opacity = "1";
			}
		});
	}

	$storage.lazyLoad.update();
});
</script>

<!-- TODO: Custom Controls for individual visibility -->
{#if (src || backup)}
	<video bind:this={el} class="lazy opacity-0 transition-opacity duration-[250ms] {(fit === "cover") ? "absolute h-full object-center object-cover w-full z-[0]" : ""}" data-src={src} controls={showMuteUnmute} autoplay={autoplay} loop={loop} bind:currentTime bind:duration bind:muted bind:readyState bind:videoWidth bind:videoHeight bind:volume playsinline="playsinline" preload="metadata">
		{#if src}
			<source type={returnMimeType(src)} data-src={src} />
		{/if}
		{#if backup}
			<source type={returnMimeType(backup)} data-src={backup} />
		{/if}
		<track kind="captions" />
	</video>
{/if}