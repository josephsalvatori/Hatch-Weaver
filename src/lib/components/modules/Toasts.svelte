<script>
import { dismissToast, toasts } from "$lib/stores/functions";
import Toast from "$lib/components/slots/Toast.svelte";
</script>

<style lang="postcss">

section {
	display: flex;
	flex-direction: column;
	left: 0;
	justify-content: center;
	margin-top: 1rem;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1000;
}

</style>

{#if $toasts}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast type={toast.type} dismissible={toast.dismissible} on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast>
		{/each}
	</section>
{/if}