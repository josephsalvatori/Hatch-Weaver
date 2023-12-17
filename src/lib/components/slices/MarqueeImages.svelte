<script>
import inview from "$lib/stores/observer";
import Image from "$lib/components/molecules/Image.svelte";
import Marquee from "$lib/components/slots/Marquee.svelte";
import { isFilled } from "@prismicio/helpers";
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
let contentVerticalPadding = data?.content_vertical_padding || true;

/** Marquee */
let marqueePauseOnHover = data?.marquee_pause_on_hover || true;
let marqueeDirection = data?.marquee_direction || "left";
let marqueeSpeed = data?.marquee_speed || 15;
let marqueeMaxHeight = data?.marquee_max_height || 300;

if(marqueeSpeed > 100) marqueeSpeed = 100;

/** Events */
let play = true;

/** Display Checks */
let hasItems = items.reduce((count, v) => count + (isFilled.image(v.marquee_image)), 0);
</script>

{#if (isFilled.group(items) && hasItems > 0)}
	<div class="w-full {(contentBoxFontColor) ? "text-[color:var(--content-color)]" : ""}" style="{(contentBoxFontColor) ? `--content-color:${contentBoxFontColor};` : ""} --max-height: {marqueeMaxHeight}px;" use:inview={inViewOptions} on:inview_change={inViewChange} on:inview_animate={inViewAnimate} on:inview_init={inViewInit}>
		<Marquee borders={false} direction={marqueeDirection.toLowerCase()} speed={marqueeSpeed} play={play} pauseOnHover={marqueePauseOnHover}>
			<div class="flex items-center {contentVerticalPadding ? "py-[var(--content-gap)]" : ""}">
				{#each items as image, i}
					{#if isFilled.image(image.marquee_image)}
						{@const imageHeight = marqueeMaxHeight}
						{@const imageWidth = Math.round((image.marquee_image.dimensions.width / image.marquee_image.dimensions.height) * marqueeMaxHeight)}
						<div class="pr-[var(--content-gap)]">
							<div class="relative aspect-square h-[var(--max-height)] {(marqueeMaxHeight > 480) ? "rounded-[var(--border-radius)]" : "rounded-[var(--border-radius-inner)]"} overflow-hidden w-[var(--image-width)]" style="--image-width: {imageWidth}px;">
								<Image src={image.marquee_image.url} alt={image.marquee_image.alt} height={imageHeight} width={imageWidth} fit={"cover"} />
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</Marquee>
	</div>
{/if}