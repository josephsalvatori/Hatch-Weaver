<script>
import IconError from "$lib/components/molecules/icons/IconError.svelte";

export let success = false;
export let errors = [];
</script>

<!-- svelte-ignore a11y-autofocus -->
<div class:error-wrapper={!success} class:success-wrapper={success} tabindex="-1">
	<div class="flex items-start">
		{#if success}
			<!-- TODO: Success Icon State? -->
			ICON SUCCESS
		{:else}
			<IconError />
		{/if}
	</div>
	<ul>
		{#each errors as error}
			<li>{@html error.message || error}</li>
		{/each}
	</ul>
</div>