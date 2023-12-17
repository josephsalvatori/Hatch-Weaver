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
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" height={size} width={size} fill="none" stroke="currentColor" stroke-width="{strokeWidth}" stroke-linecap="{linecap}" stroke-linejoin="{linecap}" class="icon icon-account {customClass}" viewBox="0 0 1200 1227">
	<title>Twitter</title>
	<path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
</svg>