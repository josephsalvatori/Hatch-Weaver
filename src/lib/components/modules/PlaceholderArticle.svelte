<script>
import Placeholder from "$lib/components/utilities/Placeholder.svelte";
</script>

<article class="bg-[var(--theme-color-background)] rounded-[var(--border-radius)] flex flex-col h-full overflow-hidden w-full">
	<div class="aspect-square block relative overflow-hidden">
		<Placeholder type={"image"} />
	</div>
	<div class="flex flex-col flex-grow justify-between p-[var(--content-gutter)]">
		<div class="richtext">
			<Placeholder type={"headline"} style={"h5"} />
			<Placeholder type={"text"} />
			<Placeholder type={"link"} />
		</div>
	</div>
</article>