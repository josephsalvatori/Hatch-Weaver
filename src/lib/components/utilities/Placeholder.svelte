<script>
export let type = "text";
export let style = "";
</script>

<template>
	{#if type === "image"}
		<div class="placeholder absolute h-full left-0 object-cover top-0 w-full"></div>
	{:else if type === "button"}
		<button class="placeholder h-[44px] rounded-[var(--border-radius-inner)] w-[100px]" type="button">&nbsp;</button>
	{:else if type === "link"}
		<p class="placeholder rounded-[var(--border-radius)] w-[100px]">&nbsp;</p>
	{:else if type === "headline"}
		<p class="placeholder rounded-[var(--border-radius)] w-[200px] {style}">&nbsp;</p>
	{:else}
		<p class="placeholder rounded-[var(--border-radius)]">&nbsp;</p>
		<p class="placeholder rounded-[var(--border-radius)]">&nbsp;</p>
		<p class="placeholder rounded-[var(--border-radius)]">&nbsp;</p>
	{/if}
</template>

<style lang="scss">
$placeholder: var(--color-input-placeholder, #F2F2F2);

.placeholder {
	animation: pulse 2s linear infinite;
	background-color: $placeholder !important;
	border-color: $placeholder !important;
}

@keyframes pulse {

	50% {
		opacity: .5;
	}
}
</style>