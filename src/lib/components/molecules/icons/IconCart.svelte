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
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" height={size} width={size} fill="none" stroke="currentColor" stroke-width="{strokeWidth}" stroke-linecap="{linecap}" stroke-linejoin="{linecap}" class="icon icon-shopping-cart {customClass}" viewBox="0 0 24 24">
	<title>Cart</title>
	<circle cx="9" cy="21" r="1"></circle>
	<circle cx="20" cy="21" r="1"></circle>
	<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
</svg>