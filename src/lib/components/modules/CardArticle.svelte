<script>
import Debug from "$lib/components/Debug.svelte";
import Image from "$lib/components/molecules/Image.svelte";
import Placeholder from "$lib/components/utilities/Placeholder.svelte";
import { asText } from "@prismicio/client";
import { truncate } from "$js/_helpers/strings";
import mockArticle from "$js/_mocks/Article";

export let article = mockArticle;

/** Content */
let content = asText(article.data.content);
let shortDescription = article?.data?.meta_description || truncate(content, 120);
</script>

<article class="bg-[var(--theme-color-background)] rounded-[var(--border-radius)] flex flex-col h-full overflow-hidden w-full">
	{#if article?.data?.image?.url}
		<a class="aspect-square block relative overflow-hidden" href="{article.url}" aria-label={asText(article?.data?.title)}>
			<Image src={article.data.image.url} alt={article.data.image.alt} sizes={"(max-width: 479px) 100vw, (max-width: 1024px) 50vw, (max-width: 1024) 33vw, 25vw"} fit={"cover"} />
		</a>
	{:else if article.id === "mock"}
		<div class="aspect-square block relative overflow-hidden">
			<Placeholder type="image" />
		</div>
	{/if}
	<div class="flex flex-col flex-grow justify-between p-[var(--content-gutter)]">
		<div class="richtext">
			<h1 class="h5"><a class="!no-underline" href="{article.url}">{asText(article.data.title)}</a></h1>
			{#if shortDescription.length > 0}
				<p>{@html shortDescription}</p>
			{/if}
		</div>
		<a class="btn-text mt-[var(--content-gap)]" href="{article.url}">Read More</a>
	</div>
</article>