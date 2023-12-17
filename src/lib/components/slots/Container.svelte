<script>
export let cssVars = {};
export let classes = null;
export let id = null;

$: style = Object.entries(cssVars).map(([key, value]) => `${key}:${value}`).join(";");
</script>

<div {id} class={classes} style="display:contents;{style.trim()}">
	<slot />
</div>