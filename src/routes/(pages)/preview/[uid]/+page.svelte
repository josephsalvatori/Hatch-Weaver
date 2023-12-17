<script>
import Debug from "$lib/components/Debug.svelte";
import SliceSwitch from "$lib/components/utilities/SliceSwitch.svelte";

/** @type {import('./$types').PageData} */
export let data;
</script>

<Debug object={data.page} title={data.page?.data?.section_label[0]?.text} />

{#each data.page.data.slices as section, i}
	<SliceSwitch slice={section} index={i} />
{/each}