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
	<div class="list-none flex justify-between items-center cursor-pointer py-[16px] border-current border-t">
		<button type="button" tabindex="-1" class="font-[400] leading-none text-[length:24px] text-left cr" on:keypress={() => {}} on:click|stopPropagation={() => { open = !open }}>
			{@html title}
		</button>
		<button type="button" aria-label="Toggle Drawer" class="btn-circle text-current !w-[40px] !p-[8px] {(open === true ? "active" : "")}" on:click|stopPropagation={() => { open = !open }}>
			{#if open === true}
				<MinusIcon strokeWidth={1} size={"24"} />
			{:else}
				<PlusIcon strokeWidth={1} size={"24"} />
			{/if}
		</button>
	</div>
	{#if open}
		<div class="richtext text-[length:0.8em] pb-[var(--content-gutter)]" transition:slide={{ axis: "y", duration: 50 }}>
			<slot />
		</div>
	{/if}
</article>