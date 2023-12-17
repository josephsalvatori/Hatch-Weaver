<script>
import Debug from "$lib/components/Debug.svelte";
import Image from "$lib/components/molecules/Image.svelte";

export let collection;
</script>

{#if collection.image}
	<div class="relative w-full">
		<div class="min-h-[calc(50vh_-_62px)] relative w-full">
			<Image fit={"cover"} src={collection.image.url} />
		</div>
		<div class="absolute ca flex h-full items-end left-0 pointer-events-none top-0 w-full z-[2]">
			<div class="bg-[var(--theme-color-background)] max-w-[800px] p-[var(--content-gutter)] rounded-[var(--border-radius)] w-auto">
				<div class="richtext pointer-events-auto">
					<h1>{collection.title}</h1>
					{#if collection.descriptionHtml}
						<div>{@html collection.descriptionHtml}</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="richtext ca border-b-2">
		<h1>{collection.title}</h1>
		{#if collection.descriptionHtml}
			<div>{@html collection.descriptionHtml}</div>
		{/if}
	</div>
{/if}