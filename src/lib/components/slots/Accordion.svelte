<script>
import { asHTML } from "@prismicio/client";
import { MinusIcon, PlusIcon } from "svelte-feather-icons";
import { slide } from "svelte/transition";

export let open = false;
export let title = "";

if(typeof title === "object") {
	title = asHTML(title);
}
</script>

<article>
	<button type="button" class="btn-accordion list-none flex justify-between items-center cursor-pointer py-[16px] border-current border-t w-full" on:keypress={() => {}} on:click|stopPropagation={() => { open = !open }}>
		<h4 tabindex="-1" class="font-[400] leading-none text-[length:24px] text-left cr">
			{@html title}
		</h4>
		<div aria-label="Toggle Drawer" class="btn-wrapper btn-circle text-current !w-[40px] !p-[8px]" class:is-active={open}>
			{#if open === true}
				<MinusIcon strokeWidth={1} size={"24"} />
			{:else}
				<PlusIcon strokeWidth={1} size={"24"} />
			{/if}
		</div>
	</button>
	{#if open}
		<div class="richtext text-[length:0.8em] pb-[var(--content-gutter)]" transition:slide={{ axis: "y", duration: 50 }}>
			<slot />
		</div>
	{/if}
</article>