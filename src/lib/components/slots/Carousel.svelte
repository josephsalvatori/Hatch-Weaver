<script>
import { onMount } from "svelte";
import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
import { register } from "swiper/element/bundle";
import Debug from "$lib/components/Debug.svelte";
import Image from "$lib/components/molecules/Image.svelte";
import { slugify } from "$js/_helpers/slugify";

export let alignment = "start";
export let items = [];
export let selected = null;
export let arrows = true;
export let thumbs = false;
export let effect = "fade";
export let params = {};
export let overflow = false;

let elWidth;
let swiper;
let lockedSelection = selected;

/** @type {import('swiper/element/bundle').register} */
register();

const props = Object.assign({
	injectStyles: [
		`
			:host .swiper  {
				overflow: ${(overflow === true ? "visible" : "hidden")};
			}

			:host .swiper-wrapper {
				align-items: ${(alignment.toLowerCase() === "center" ? "center" : (alignment.toLowerCase() === "bottom" ? "end" : (alignment.toLowerCase()=== "fill" ? "stretch" : "start")))}
			}
		`,
	],
	loop: false,
	slidesPerView: 1
}, params);

/** Reactive Variables */
$: activeIndex = 0;
$: pages = Math.ceil(items.length / props.slidesPerView);

onMount(() => {

	Object.assign(swiper, props);

	swiper.initialize();

	if(swiper?.swiper) {
		pages = swiper.swiper.snapGrid.length;
		swiper.swiper.update();
	}
});

/** This will control changing image externally */
$: if(selected && selected.node.image.url !== lockedSelection?.node?.image?.url) {

	[...items].forEach((v, i) => {

		if(v.node.url === selected.node.image.url) {

			lockedSelection = v;

			if(swiper?.swiper) swiper.swiper.slideTo(i);
		}
	});
}
</script>

{#if thumbs}
	<div class="flex flex-col mr-[var(--grid-gap-x)] w-full">
		{#each items as item, i}
			<button type="button" class="block w-full aspect-square mb-[var(--content-gap)] border-2 relative overflow-hidden {(i === activeIndex) ? "rounded-full" : ""}" on:click={() => swiper.swiper.slideTo(i)}>
				<Image src={item.node.url} fit={"cover"} sizes={"10vw"} width={240} height={240} />
			</button>
		{/each}
	</div>
{/if}
<swiper-container bind:this={swiper} bind:clientWidth={elWidth}
	class="block h-auto w-full slides slides-{slugify(alignment)}"
	effect={effect}
	init={false}
	on:slidechange={(s) => {
		activeIndex = s.detail[0].snapIndex || s.detail[0].activeIndex;
	}}
	on:snapgridlengthchange={(s) => {
		pages = s.detail[0].snapGrid.length;
	}}
>
	<div slot="container-end">
		{#if pages > 1 && arrows === true}
			<div class="flex items-center justify-center pt-[var(--content-gap)] pb-[5px]">
				<button class="btn-circle cursor-pointer" aria-label="Previous Slide" on:click={() => { swiper.swiper.slidePrev(); }}><ArrowLeftIcon strokeWidth={2} /></button>
				<ul class="flex mx-[var(--content-gap)]">
					{#each {length: pages} as _, i}
						<li class="mx-[4px]"><button type="button" tabindex="-1" class="btn-circle {activeIndex === i ? "is-active cursor-default" : ""} w-[10px] h-[10px] border-2" on:click={() => swiper.swiper.slideTo(i)}></button></li>
					{/each}
				</ul>
				<button class="btn-circle cursor-pointer" aria-label="Next Slide" on:click={() => { swiper.swiper.slideNext(); }}><ArrowRightIcon strokeWidth={2} /></button>
			</div>
		{/if}
	</div>
	<slot />
</swiper-container>