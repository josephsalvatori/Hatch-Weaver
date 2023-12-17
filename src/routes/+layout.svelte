<script>
import { browser, dev } from "$app/environment";
import { beforeNavigate } from "$app/navigation";
import { page } from "$app/stores";
import { context } from "$lib/stores/storage";
import { user } from "$lib/stores/user";
import { webVitals } from "$lib/integrations/vitals";
import TailwindConfig from "$lib/integrations/tailwind/TailwindConfig.svelte";
import Analytics from "$lib/integrations/analytics/Analytics.svelte";
import GlobalHeader from "$lib/components/sections/GlobalHeader.svelte";
import GlobalFooter from "$lib/components/sections/GlobalFooter.svelte";
import Container from "$lib/components/slots/Container.svelte";
import Favicon from "$lib/components/utilities/Favicon.svelte";
import Metadata from "$lib/components/utilities/Metadata.svelte";
import { onMount } from "svelte";
import { MetaTags } from "svelte-meta-tags";
import config from "../../slicemachine.config.json";

/** @type {import('./$types').PageData} */
export let data;

$: if(!dev && browser && data?.analyticsId) {

	webVitals({
		path: $page.url.pathname,
		params: $page.params,
		analyticsId: data.analyticsId
	});
}

/** Reactive metatags */
$: metaTags = {
	titleTemplate: `%s | ${data.settings?.settings?.data?.title || ""}`,
	description: `${data.settings?.settings?.data?.description || ""}`,
	canonical: `${$page.url.origin}${$page.url.pathname}`,
	facebook: {
		appId: data.settings?.settings?.data?.facebook_app_id
	},
	...($page.data.meta ? Object.fromEntries(Object.entries($page.data.meta).filter(([_, v]) => !!v)) : {})
};

beforeNavigate((s) => {
	if(s.from?.url?.pathname !== s.to?.url?.pathname) $context.closeAll();
});

onMount(async () => {

	/** Attempt to close the cart */
	if ($user.shop?.cart?.id) {

		let checkCart = await fetch("/api/v1/storefront/cart", {
			method: "POST",
			body: JSON.stringify({
				id: $user.shop.cart.id
			})
		});

		let cartResponse = await checkCart.json();

		if (!cartResponse.cart) {

			$user.shop.cart = {
				id: null,
				obj: {}
			};
		}
	}
});

// $: console.log(metaTags);
</script>

<style lang="scss" global>
@import "../code/css/tailwind.scss";
@import "../code/css/app.scss";
</style>

<svelte:head>
	{#if data?.settings?.settings?.data?.favicon?.url}
		<Favicon url={data.settings.settings.data.favicon.url} />
	{/if}
	{#if import.meta.env.MODE == "development"}
		<!-- <svelte:component this={TailwindConfig}></svelte:component> -->
	{/if}
	{#if data?.googleFonts}
		<link href="{data.googleFonts.url}" rel="stylesheet" />
	{/if}
	{#if data?.settings?.data?.ga_measurement_id}
		<Analytics type={"google"} uid={data.userid} id={data.settings.data.ga_measurement_id} />
	{/if}
	{#if data?.preview}
		<script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=sveltekit-terminal"></script>
	{/if}
</svelte:head>

<MetaTags {...metaTags} />
<Container cssVars={data?.cssVars}>
	<slot />
</Container>