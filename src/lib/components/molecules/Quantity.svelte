<script>
import { PlusIcon, MinusIcon } from "svelte-feather-icons";

export let hideLegend = false;
export let quantity = 1;
export let max = 99;
export let min = 1;
export let name = "quantity";
export let padding = true;
export let size = 20;

$: if(quantity > max) quantity = max;
$: if(quantity < min) quantity = min;
</script>

<div class="{(padding === true) ? "pr-[var(--content-gap)]" : ""}">
	{#if hideLegend !== true}
		<legend>Qty</legend>
	{/if}
	<div class="flex items-center" style="--size: {size}px; --btn-height: calc({size} * 2px); --btn-width: calc({size} * 2px);">
		<button type="button" class="btn-input !p-0 h-[var(--btn-height)] w-[var(--btn-width)] !m-0" on:click={() => { if(quantity > min) quantity--; }}>
			<MinusIcon size={size.toString()} strokeWidth={2} />
		</button>
		<input tabindex="-1" class="border-b-2 p-0 min-w-[var(--btn-width)] !w-[var(--btn-width)] text-[length:var(--size)] appearance-none text-center inline-flex h-[var(--btn-height)] mx-[10px]" type="text" name={name} bind:value={quantity} />
		<button type="button" class="btn-input !p-0 h-[var(--btn-height)] w-[var(--btn-width)] !m-0" on:click={() => { quantity++; }}>
			<PlusIcon size={size.toString()} strokeWidth={2} />
		</button>
	</div>
</div>