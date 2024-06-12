<script>
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";

/** @type {import('./$types').PageData} */
export let data;
</script>

<div class="min-h-screen grid items-center w-full bg-blue-50">
	<div class="flex items-center justify-center mx-auto">
		<div class="richtext max-w-[800px] px-[var(--site-gutter)]">
			<h1>Currently incubating.</h1>
			<p>Getting ready to hatch soon.</p>
		</div>`
	</div>
</div>

<!-- {#key data.page.id}
	{#each data.page.data.slices as section, i}
		<SliceSwitch slice={section} index={i} />
	{/each}
{/key} -->