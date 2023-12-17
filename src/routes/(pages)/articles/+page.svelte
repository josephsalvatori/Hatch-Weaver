<script>
import Debug from "$lib/components/Debug.svelte";
import { asLink, asText } from "@prismicio/client";

/** @type {import('./$types').PageData} */
export let data;

</script>

{#key data?.page?.id}
	<Debug object={data.page} />
	<Debug object={data.categories} />
	<div class="ca">
		<ul>
			{#each data.categories as category}
				<li>- <a href="{asLink(category)}">{asText(category.data.title)}</a></li>
			{/each}
		</ul>
	</div>
{/key}