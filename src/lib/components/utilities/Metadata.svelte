<script>
import { page } from "$app/stores";
import { JsonLd, MetaTags } from "svelte-meta-tags";
import { asText } from "@prismicio/helpers";
import Debug from "$lib/components/Debug.svelte";

export let type = "WebPage";

let pageData = $page?.data?.page;
let settings = $page?.data?.settings?.settings;

/** Defaults */
let siteUrl = $page.url;
let websiteSameAs = [];

let pageSchema = {
	"@context": "https://schema.org",
};

let websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${siteUrl.origin}/#website`,
	"url": `${siteUrl.origin}/`
};

if(settings?.data?.facebook_url?.url) websiteSameAs.push(settings.data.facebook_url.url);
if(settings?.data?.instagram_url?.url) websiteSameAs.push(settings.data.instagram_url.url);
if(settings?.data?.tiktok_url?.url) websiteSameAs.push(settings.data.tiktok_url.url);
if(settings?.data?.twitter_url?.url) websiteSameAs.push(settings.data.twitter_url.url);
if(settings?.data?.youtube_url?.url) websiteSameAs.push(settings.data.youtube_url.url);

websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${siteUrl.origin}/#website`,
	"url": `${siteUrl.origin}/`,
	"sameAs": websiteSameAs
};

if(settings?.data?.title) websiteSchema.name = settings.data.title.trim();

if(settings?.data?.organization_name || settings?.data?.organization_legal_name) {

	websiteSchema.publisher = {
		"@type": "Organization",
		"@id": `${siteUrl.origin}/#org`
	};

	if(settings?.data?.organization_logo?.url) {

		websiteSchema.publisher.logo = {
			"@type": "ImageObject",
			"contentUrl": `${settings.data.organization_logo.url}`
		};
	}
	if(settings?.data?.organization_url?.url) websiteSchema.publisher.url = settings.data.organization_url.url;
	if(settings?.data?.organization_name) websiteSchema.publisher.name = settings.data.organization_name.trim();
	if(settings?.data?.organization_legal_name) websiteSchema.publisher.legalName = settings.data.organization_legal_name.trim();
	if(settings?.data?.organization_description) websiteSchema.publisher.description = settings.data.organization_description.trim();
	if(settings?.data?.organization_email) websiteSchema.publisher.email = settings.data.organization_email.trim();
	if(settings?.data?.organization_phone) websiteSchema.publisher.telephone = settings.data.organization_phone.trim();
}

/**
 * WebPage Schema
 */
let otherImages = [];

if($page?.data?.type === "article") type = "Article";

pageSchema = {
	"@context": "https://schema.org",
	"@type": `${type}`,
	"@id": `${siteUrl.origin}${siteUrl.pathname}`,
	"mainContentOfPage": {
		"@type": "WebPageElement",
		"cssSelector": "#main-content"
	},
	"isPartOf": {
		"@id": `${siteUrl.origin}/#website`
	},
	"url": `${$page.url}`
};

if(pageData?.last_publication_date) pageSchema.dateModified = `${pageData.last_publication_date}`;
if(pageData?.first_publication_date) pageSchema.datePublished = `${pageData.first_publication_date}`;
if(pageData?.data?.meta_title) pageSchema.headline = pageData.data.meta_title;
if(pageData?.data?.meta_description) pageSchema.description = pageData.data.meta_description;
if(pageData?.data?.meta_image?.url) {

	let image = pageData.data.meta_image.url;
	let alt = pageData.data?.meta_image?.alt || "";
	let height = pageData.data?.meta_image?.dimensions?.height || 1260;
	let width = pageData.data?.meta_image?.dimensions?.width || 2400;

	pageSchema.image = {
		"@type": "ImageObject",
		"url": `${image}`,
		"alt": `${alt}`,
		"height": `${height}`,
		"width": `${width}`
	};
}

/**
 * Product Schema
 */
if(type === "Product") {
	console.log(pageSchema);
}
</script>

<!-- {#if $page?.data?.page?.data}
	<JsonLd schema={pageSchema} output={"body"} />
{/if} -->

{#if type === "WebSite"}
	<JsonLd schema={websiteSchema} output={"body"} />
{/if}

{#if type === "WebPage" || type === "Product"}
	<Debug object={pageSchema} title={type} />
	<JsonLd schema={pageSchema} output={"body"} />
{/if}

{#if type === "Article"}
	<Debug object={pageSchema} title={type} />
{/if}

{#if type === "Product"}
	<Debug object={pageData} title={type} />
{/if}