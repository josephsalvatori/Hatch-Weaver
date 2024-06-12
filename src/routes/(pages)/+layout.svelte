<script>
import { page } from "$app/stores";
import GlobalHeader from "$lib/components/sections/GlobalHeader.svelte";
import GlobalFooter from "$lib/components/sections/GlobalFooter.svelte";
import Metadata from "$lib/components/utilities/Metadata.svelte";

</script>

<GlobalHeader />
<main id="main" data-content={$page?.data?.page?.type} tabindex="-1">
	<slot />
	<Metadata type="WebSite" />
</main>
<!-- <GlobalFooter /> -->