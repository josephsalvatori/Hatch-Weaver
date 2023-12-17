<script>
import { createEventDispatcher } from "svelte";
import { XCircleIcon } from "svelte-feather-icons";
import { fade } from "svelte/transition";


// TODO:
// import SuccessIcon from "./SuccessIcon.svelte";
// import ErrorIcon from "./ErrorIcon.svelte";
// import InfoIcon from "./InfoIcon.svelte";
// import CloseIcon from "./CloseIcon.svelte";

const dispatch = createEventDispatcher();

export let type = "error";
export let dismissible = true;
</script>

<article class={type} role="alert" transition:fade>
	<div class="text">
		<slot />
	</div>
	{#if dismissible}
		<button class="close" on:click={() => dispatch("dismiss")}>
			<XCircleIcon size={"20"} />
			<!-- <CloseIcon width="0.8em" /> -->
		</button>
	{/if}
</article>

<style lang="postcss">

article {
	align-items: center;
	background: var(--theme-color-button-background);
	border-radius: var(--border-radius-input);
	color: var(--theme-color-button-font);
	display: flex;
	margin: 0 auto var(--content-gap);
	max-width: calc(100% - 30px);
	justify-content: space-between;
	padding: 15px 20px;
	width: 300px;
}

.error {

}

.success {

}

.info {

}

.text {
	font-size: 14px;
}

button {
	align-items: center;
	display: flex;
	height: 30px;
	justify-content: center;
	margin-left: 20px;
	min-width: 30px;
	width: 30px;
}

</style>