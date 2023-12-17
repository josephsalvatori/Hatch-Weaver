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
	<div class="list-none flex justify-between items-center cursor-pointer py-[10px] border-t-2">
		<button type="button" tabindex="-1" class="font-bold leading-none text-left text-[length:20px] cr" on:keypress={() => {}} on:click|stopPropagation={() => { open = !open }}>{@html title}</button>
		<button type="button" aria-label="Toggle Drawer" class="btn-input !w-[32px] !p-[6px] {(open === true ? "active" : "")}" on:click|stopPropagation={() => { open = !open }}>
			{#if open === true}
				<MinusIcon size="24" />
			{:else}
				<PlusIcon size="24" />
			{/if}
		</button>
	</div>
	{#if open}
		<div class="richtext pb-[var(--content-gutter)]" transition:slide={{ axis: "y", duration: 50 }}>
			<slot />
		</div>
	{/if}
</article>