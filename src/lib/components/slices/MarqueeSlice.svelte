<script>
import inview from "$lib/stores/observer";
import Marquee from "$lib/components/slots/Marquee.svelte";
import { asHTML, asText, isFilled } from "@prismicio/helpers";
import { staggerFade } from "$js/_helpers/animation";

/**
 * A description
 * @typedef {Object} Slice~Marquee
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

/** Content */
let contentBoxFontColor = data?.content_box_font_color || null;
let contentVerticalPadding = data?.content_vertical_padding || false;

/** Marquee */
let marqueePauseOnHover = data?.marquee_pause_on_hover || true;
let marqueeSpeed = data?.marquee_speed || 15;

if(marqueeSpeed > 100) marqueeSpeed = 100;

/** Events */
let play = true;

/** Display Checks */
let hasItems = items.reduce((count, v) => count + (isFilled.richText(v.marquee_row)), 0);
</script>

{#if (isFilled.group(items) && hasItems > 0)}
	<div class="w-full {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""}" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		{#each items as item, i}
			{#if isFilled.richText(item.marquee_row)}
				<Marquee direction={(i % 2 === 0 ? "left" : "right")} speed={marqueeSpeed} play={play} pauseOnHover={marqueePauseOnHover} label={asText(item.marquee_row)} colors={{
					bg: item.marquee_row_background_color || null,
					ft: item.marquee_row_font_color || null
				}}>
					<div class="min-w-[50px]">
						<div class="flex items-center pr-[var(--content-gap)] {contentVerticalPadding ? "py-[var(--content-gap)]" : ""}">
							{@html asHTML(item.marquee_row)}
						</div>
					</div>
				</Marquee>
			{/if}
		{/each}
	</div>
{/if}