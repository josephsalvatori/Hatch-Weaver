<script>
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";
import Metadata from "$lib/components/utilities/Metadata.svelte";

/** @type {import('./$types').PageData} */
export let data;
</script>

{#key data.page.id}
	{#each data.page.data.slices as section, i}
		<SliceSwitch slice={section} index={i} />
	{/each}
{/key}

<Metadata type="WebPage" />