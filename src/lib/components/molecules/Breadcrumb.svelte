<script>
import { page } from "$app/stores";

export let pathArray = [];
export let labelArray = [];
</script>

{#if pathArray.length > 0}
	<small class="flex items-center">
		{#each pathArray as item, key}
			{@const path = [...pathArray].filter((v, i) => i <= key)}
			{@const url = `/${path.join("/")}/`}
			{#if $page.url.pathname === url}
				<div class="uppercase">{labelArray[key] || item}</div>
			{:else}
				<div>
					<a class="uppercase" href={url}>{labelArray[key] || item}</a>
					<span>&raquo;&nbsp;</span>
				</div>
			{/if}
		{/each}
	</small>
{/if}