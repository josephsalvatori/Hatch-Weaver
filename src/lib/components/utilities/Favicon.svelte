<script>
export let url;

let favicon = url;
let faviconObj = {};

if(url.indexOf("prismic") > -1) {

	favicon = url.replace("?auto=compress,format", "");
	favicon = favicon.replace("?auto=format,compress", "");
	faviconObj = {
		"default": `${favicon}?w=96&h=96&fit=fill&fm=png`,
		"x32": `${favicon}?w=32&h=32&fit=fill&fm=png`,
		"x57": `${favicon}?w=57&h=57&fit=fill&fm=png`,
		"x76": `${favicon}?w=76&h=76&fit=fill&fm=png`,
		"x96": `${favicon}?w=96&h=96&fit=fill&fm=png`,
		"x128": `${favicon}?w=128&h=128&fit=fill&fm=png`,
		"x144": `${favicon}?w=144&h=144&fit=fill&fm=png`,
		"x152": `${favicon}?w=152&h=152&fit=fill&fm=png`,
		"x180": `${favicon}?w=180&h=180&fit=fill&fm=png`,
		"x192": `${favicon}?w=192&h=192&fit=fill&fm=png`,
		"x228": `${favicon}?w=228&h=228&fit=fill&fm=png`
	};
}
</script>
{#if Object.keys(faviconObj).length > 0}
<link rel="icon" href={faviconObj.default} />
<!-- <link rel="icon" href={faviconObj.x32} sizes="32x32" /> -->
<!-- <link rel="icon" href={faviconObj.x57} sizes="57x57" /> -->
<!-- <link rel="icon" href={faviconObj.x76} sizes="76x76" /> -->
<link rel="icon" href={faviconObj.x96} sizes="96x96" />
<link rel="icon" href={faviconObj.x144} sizes="144x144" />
<link rel="icon" href={faviconObj.x192} sizes="192x192" />
<link rel="icon" href={faviconObj.x228} sizes="228x228" />
<link rel="apple-touch-icon" href={faviconObj.x152} sizes="152x152" />
<link rel="apple-touch-icon" href={faviconObj.x180} sizes="180x180" />
{/if}
<link rel="manifest" href="/site.webmanifest" />