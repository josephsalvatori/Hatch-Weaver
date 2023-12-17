<script>
export let linecap = "round";
export let size = "24";
export let strokeWidth = 0;

let customClass = "";

export { customClass as class };

if(size !== "100%") {
	size = size.slice(-1) === "x" ? size.slice(0, size.length - 1) + "em": parseInt(size) + "px";
}
</script>
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" height={size} width={size} fill="none" stroke="currentColor" stroke-width="{strokeWidth}" stroke-linecap="{linecap}" stroke-linejoin="{linecap}" class="icon icon-account {customClass}" viewBox="0 0 18 16">
	<title>TikTok</title>
	<path d="M8.02 0H11s-.17 3.82 4.13 4.1v2.95s-2.3.14-4.13-1.26l.03 6.1a5.52 5.52 0 11-5.51-5.52h.77V9.4a2.5 2.5 0 101.76 2.4L8.02 0z" fill-rule="evenodd" fill="currentColor" />
</svg>