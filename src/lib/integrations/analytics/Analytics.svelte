<script>
/**
 * This is an injection component for analytics scripts
 */
export let type = "google";
export let id = null;
export let uid = null;
export let consent = {
	ad_storage: "denied",
	analytics_storage: "denied"
};
</script>

{#if id}
	{#key id}
		{#if type === "google"}
			{@html `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>`}
			{#if uid}
				{@html `<script> window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag("consent", "default", { ad_storage: ${JSON.stringify(consent.ad_storage)}, analytics_storage: ${JSON.stringify(consent.analytics_storage)} }); gtag("js", new Date()); gtag("config", ${JSON.stringify(id)}, { "user_id": ${JSON.stringify(uid)} }); </script>`}
			{:else}
				{@html `<script> window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag("consent", "default", { ad_storage: ${JSON.stringify(consent.ad_storage)}, analytics_storage: ${JSON.stringify(consent.analytics_storage)} }); gtag("js", new Date()); gtag("config", ${JSON.stringify(id)});</script>`}
			{/if}
		{/if}
	{/key}
{/if}