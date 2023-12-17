<script>
/**
 * @fileOverview responsive image descriptions
 * @module
 * @typedef {Object} Components~ResponsiveImage
 */
import { onMount } from "svelte";
import { dev } from "$app/environment";
import { page } from "$app/stores";
import { storage } from "$lib/stores/storage";
import LazyLoad from "vanilla-lazyload";
import { processImages } from "$js/_helpers/image";

export let alt = "";
export let breakpoint = 768;
export let fit = "cover";
export let height = null;
export let sizes = "100vw"; // should this null or default?
export let src; // string or object?
export let srcMobile = src;
export let width = 2048;
export let type = "responsive";
export let placeholder = true;

/** Settings */
let el;
let widths = [20, 200, 400, 800, 1200, 1600, 1880];
let quality = 90;

/** Filter our widths by our max size */
widths = widths.filter(v => v <= width);

let processedImages = processImages({ breakpoint, src, srcMobile, quality, width, widths });

/**
 * let's recalculate sizes
 */
let elWidth = 0;
let windowWidth = 0;

$: if(elWidth > 0 && windowWidth > 0) {
	sizes = `${Math.round((elWidth / windowWidth) * 100)}vw`;
}

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

<svelte:window bind:innerWidth={windowWidth}></svelte:window>

{#if src}
	{#if src.indexOf(".svg") > -1 || type !== "responsive" || processedImages.set.length <= 0}
		<div bind:this={el} bind:clientWidth={elWidth} class="{(fit === "cover") ? "object-cover w-full h-full absolute object-center z-0" : "max-w-full"} {(fit === "contain") ? "object-contain w-full h-full absolute object-center z-0" : ""}">
			<img alt={alt} class="lazy {(fit === "cover") ? "object-cover w-full h-full absolute object-center z-0" : ""} {(fit === "contain") ? "object-contain w-full h-full absolute object-center z-0" : ""}" width={width} height={height} data-src={processedImages.base} />
		</div>
	{:else}
		<picture bind:this={el} bind:clientWidth={elWidth} class="{(fit === "cover") ? "object-cover w-full h-full absolute top-0 left-0 object-center z-0" : "max-w-full"} {(fit === "contain") ? "object-contain w-full h-full absolute object-center z-0" : ""}">
			<source data-srcset={processedImages.set} sizes={sizes} />
			<img alt={alt} class="lazy {(fit === "cover") ? "object-cover w-full h-full absolute object-center z-0" : ""} {(fit === "contain") ? "object-contain w-full h-full absolute object-center z-0" : ""}" src={(placeholder === true && processedImages.placeholder) ? processedImages.placeholder : null} width={width} height={height} data-src={processedImages.base} />
		</picture>
	{/if}
{/if}