<script>
import Image from "$lib/components/molecules/Image.svelte";
import Price from "$lib/components/molecules/Price.svelte";
import Quantity from "$lib/components/molecules/Quantity.svelte";
import { user } from "$lib/stores/user";

export let index;
export let lineItem;
export let lock = false;

let lineQuantity = lineItem.quantity;

/**
 * update the cart
 * @param item
 * @param quantity
 */
const quantityChange = async (item, quantity) => {

	if(lock === true) return;

	lock = true;

	let update = await fetch("/api/v1/storefront/cart/update", {
		method: "POST",
		body: JSON.stringify({
			cart: $user.shop.cart.id,
			lines: [item]
		})
	}).catch((error) => {
		console.log(error);
	});

	let data = await update.json();

	if(data?.cartId) {

		if(typeof $user.shop.cart !== "object") $user.shop.cart = {};

		$user.shop.cart.id = data.cartId;
		$user.shop.cart.obj = data.cart;
	}

	lock = false;
};

/** Reactive quantity ~ might have an issue with repeated updates */
$: if(lineItem.quantity !== lineQuantity) {

	lineItem.quantity = lineQuantity;

	quantityChange(lineItem, lineQuantity);
}
</script>

<article data-idx={index} class="border-b-2 mb-[var(--content-gap)] pb-[var(--content-gap)] flex items-start justify-between">
	<div class="h-[80px] w-[80px] min-w-[80px] mr-[var(--content-gap)] rounded-[var(--border-radius-inner)] relative aspect-square overflow-hidden">
		<Image src={lineItem.merchandise.image.url} width={240} fit={"cover"} />
	</div>
	<div class="flex items-stretch justify-between w-full">
		<div class="mr-[var(--content-gap)]">
			<h1 class="h5">{lineItem.merchandise.product.title}</h1>
			{#if lineItem.sellingPlanAllocation?.sellingPlan?.id}
				<small>{lineItem.sellingPlanAllocation.sellingPlan.name}</small>
			{/if}
			<ul class="mt-[var(--content-gap)] text-[length:14px]">
				{#each lineItem.merchandise.selectedOptions as option}
					<li>{option.name}: {option.value}</li>
				{/each}
			</ul>
		</div>
		<div class="flex flex-1 flex-col justify-between items-end relative">
			<div class="whitespace-nowrap">
				<Price price={lineItem?.cost?.amountPerQuantity?.amount} comparePrice={lineItem?.cost?.compareAtAmountPerQuantity?.amount} />
			</div>
			<div class="flex mt-[var(--content-gap)] {(lock === true ? "pointer-events-none" : "")}">
				<Quantity bind:quantity={lineQuantity} name={`lineItem[${index}].quantity`} hideLegend={true} min={0} padding={false} size={15} />
			</div>
		</div>
	</div>
</article>

<!--
<div class="grid grid-cols-2 gap-[15px] mb-[14px]">
	<div class="rounded-[10px] overflow-hidden">
		<Image src={lineItem.node.merchandise.image.url} width={240} />
	</div>
	<div class="flex flex-col justify-center">
		<div class="flex w-full justify-between">
			<p class="text-[length:12px] font-bold leading-[16px] pr-[15px] !mb-0">{lineItem.merchandise.product.title}</p>
			<p class="inline-block font-bold text-xs text-right !mb-0">
				<Price price={lineItem.cost.subtotalAmount.amount} />
			</p>
		</div>
		<div class="field-group mb-[20px] w-full">
			<div class="border border-current pl-[10px] pr-[10px] pt-[7px] pb-[5px] flex justify-between items-center w-full">
				<p class="text-[length:13px] font-bold m-0">QTY</p>
				<div class="flex items-center justify-center">
					<button type="button" class="text-[var(--text-color)] w-[19px] h-[19px]" on:click={() => {
						if(lock === true) return;
						if(lineItem.quantity > 0) lineItem.quantity--;
						quantityChange(lineItem, lineItem.quantity);
					}}><MinusIcon size={"18"} strokeWidth={1.25} /></button>
					<input class="border-0 p-0 w-[30px] m-0 appearance-none text-center min-w-0 inline-block h-auto pointer-events-none" type="text" name="quantity" bind:value={lineItem.quantity} />
					<button type="button" class="text-[var(--text-color)] w-[19px] h-[19px]" on:click={() => {
						if(lock === true) return;
						lineItem.quantity++;
						quantityChange(lineItem, lineItem.quantity);
					}}><PlusIcon size={"18"} strokeWidth={1.25} /></button>
				</div>
			</div>
		</div>
	</div>
</div> -->