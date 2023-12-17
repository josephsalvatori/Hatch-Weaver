<script>
import { toHTML } from "$js/_helpers/parseHtml";
import CartAdd from "$lib/components/modules/CartAdd.svelte";
import Carousel from "$lib/components/slots/Carousel.svelte";
import Image from "$lib/components/molecules/Image.svelte";

export let product;
export let selectedVariant = null;

let shortDescription = product.metafields.find((m) => m && m.key === "short_description");

if(!shortDescription) shortDescription = product.description;

let selected = selectedVariant;

$: if(selected?.node && selectedVariant.node.id !== selected?.node?.id) {
	selectedVariant = selected;
	selectedVariant = selectedVariant;
}
</script>

<!-- <div class="grid dk:grid-cols-12 gap-x-[var(--grid-gap-x)] gap-y-[var(--grid-gap-y)] items-start relative"> -->
<div class="flex items-start relative w-full">
	<!-- <div class="dk:col-span-7 flex sticky top-[80px]"> -->
	<div class="w-7/12 max-w-7/12 min-w-7/12 pr-[var(--grid-gap-x)] sticky top-[80px]">
		<div class="grid grid-cols-11 gap-x-[var(--grid-gap-x)] gap-y-[var(--grid-gap-y)] [&>:nth-child(2)]:col-span-10 max-w-full relative">
			<Carousel items={product.images.edges} selected={selectedVariant} thumbs={true}>
				{#each product.images.edges as image}
					<swiper-slide>
						<div class="w-full aspect-square">
							<Image src={image.node.url} sizes={"(max-width: 680px) 90vw, 50vw"} width={image.node.width} height={image.node.height} />
						</div>
					</swiper-slide>
				{/each}
			</Carousel>
		</div>
	</div>
	<div class="w-5/12 max-w-5/12 min-w-5/12 sticky top-[80px]">
		<div class="p-[var(--content-gutter)] border-b-2">
			<!-- {#if allowedTags.some(r => product.tags.indexOf(r) >= 0)}
				{@const filteredTags = product.tags.filter(i => allowedTags.includes(i))}
				<div class="flex flex-wrap">
					{#each filteredTags as tag}
						<div class="tag mr-[10px] mb-[10px]">
							{tag}
						</div>
					{/each}
				</div>
			{/if} -->
			<h1 class="!mb-0">{product.title.trim()}</h1>
		</div>
		<CartAdd bind:selectedVariant={selected} product={product} padding={true} />
		{#if shortDescription}
			<div class="p-[var(--content-gutter)] border-b-2">
				<div class="richtext">{@html toHTML(shortDescription.value)}</div>
			</div>
		{/if}
	</div>
</div>