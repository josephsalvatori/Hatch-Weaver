<script>
import { dev } from "$app/environment";
/**
 * Import your slices here
 */
import CarouselSlice from "$lib/components/slices/CarouselSlice.svelte";
import CarouselArticleRecirculation from "$lib/components/slices/CarouselArticleRecirculation.svelte";
import FaqsOnly from "$lib/components/slices/FaqsOnly.svelte";
import FaqsWithMedia from "$lib/components/slices/FaqsWithMedia.svelte";
import Html from "$lib/components/slices/Html.svelte";
import MarqueeSlice from "$lib/components/slices/MarqueeSlice.svelte";
import MarqueeImages from "$lib/components/slices/MarqueeImages.svelte";
import MediaOnly from "$lib/components/slices/MediaOnly.svelte";
import MediaWithContent from "$lib/components/slices/MediaWithContent.svelte";
import MediaWithContentSplit from "$lib/components/slices/MediaWithContentSplit.svelte";
import Richtext from "$lib/components/slices/Richtext.svelte";
import SectionGroup from "$lib/components/slices/SectionGroup.svelte";
import Section from "$lib/components/slots/Section.svelte";

export let slice;
export let index;

/**
 * Component list
 * @typedef {Object} ComponentList
 * @property {string}		id			- ID of the Prismic slice
 * @property {Component}	component	- Svelte component
 */
const COMPONENT_LIST = [
	{ id: "carousel", component: CarouselSlice },
	{ id: "carousel.articleRecirculation", component: CarouselArticleRecirculation },
	{ id: "faqs", component: FaqsOnly },
	{ id: "faqs.with_media", component: FaqsWithMedia },
	{ id: "html", component: Html },
	{ id: "marquee", component: MarqueeSlice },
	{ id: "marquee.images", component: MarqueeImages },
	{ id: "media", component: MediaWithContent },
	{ id: "media.media_fullscreen", component: MediaOnly },
	{ id: "media.media_split", component: MediaWithContentSplit },
	{ id: "richtext", component: Richtext },
	{ id: "section_group", component: SectionGroup },
];

/** --- Filter our component list --- */
const SELECTED_ID = slice.slice_type + `${(slice.variation !== "default" ? "." + slice.variation : "")}`;
const SELECTED_COMPONENT = COMPONENT_LIST.filter((item) => item.id === SELECTED_ID)[0];
const ITEMS = slice.items;
let PROPS = {
	id: slice.id || undefined,
	index: index,
	variation: slice.variation || undefined,
	data: slice.primary || undefined
};

/** --- Items can be empty, this silences the compile warnings --- */
if(typeof ITEMS === "undefined" || !ITEMS[0] || Object.keys(ITEMS[0]).length <= 0) {
	PROPS.items = [];
} else {
	PROPS.items = ITEMS;
}
</script>

{#if SELECTED_COMPONENT && SELECTED_COMPONENT.component && slice?.id && (dev || slice?.primary)}
	<Section type={(slice.slice_type === "section_group" ? "group" : "slice")} props={PROPS}>
		<svelte:component this={SELECTED_COMPONENT.component} data={PROPS.data} items={PROPS.items} />
	</Section>
{/if}
