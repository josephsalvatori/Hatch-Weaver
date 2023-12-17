<script>
export let linecap = "round";
export let size = "24";
export let strokeWidth = 2;

let customClass = "";

export { customClass as class };

if(size !== "100%") {
	size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em": parseInt(size) + "px";
}
</script>
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" height={size} width={size} fill="none" stroke="currentColor" stroke-width="{strokeWidth}" stroke-linecap="{linecap}" stroke-linejoin="{linecap}" class="icon icon-account {customClass}" viewBox="0 0 24 24">
	<title>Account</title>
	<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
	<circle cx="12" cy="7" r="4"></circle>
</svg>