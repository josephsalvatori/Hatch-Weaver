<script>
import { format } from "$js/_helpers/price";

export let price;
export let comparePrice = null;
export let negative = false;
export let varies = false;
export let zeros = true;
</script>

{#if varies}
	<span>Starts at &nbsp;</span>
{/if}
{#if comparePrice}
	<del class="mr-[6px] opacity-50">${format(comparePrice, zeros)}</del>
{/if}
{(negative === true) ? "-" : ""}${format(price, zeros)}
