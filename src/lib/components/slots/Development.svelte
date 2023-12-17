<script>
export let name = "Module";

let clientWidth = 0;
</script>

<div class="bg-gray-300 py-[var(--content-gutter)] cx">
	<div class="w-full max-w-[1680px] mx-auto richtext">
		<h2 class="font-mono font-bold leading-none">{name}</h2>
		<p class="font-mono text-sm m-0">{clientWidth}px width</p>
	</div>
	<div class="w-full max-w-[1680px] mx-auto mt-[var(--content-gap)]">
		<div bind:clientWidth={clientWidth} class="bg-white rounded-[var(--border-radius)] overflow-hidden ca">
			<slot />
		</div>
	</div>
</div>