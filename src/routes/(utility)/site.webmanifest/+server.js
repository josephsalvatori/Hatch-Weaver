import { Api } from "$api";

/**
 * @type {import('@sveltejs/kit').Get}
 */
export async function GET({ fetch, parent, request }) {

	let pageData = parent;
	let manifest = {
		"display": "standalone"
	};

	let response = await Api.Content.getOne({
		fetch,
		request,
		type: "settings"
	});

	if(response?.data?.favicon?.url) {

		let iconArray = [];
		let img = response.data.favicon.url;
		let imageStr;

		/** Prismic */
		if(img.indexOf("prismic") > -1) {

			imageStr = img.replace("?auto=compress,format", "");

			iconArray.push({
				"src": `${imageStr}?w=512&h=512&fit=fill&fm=png`,
				"sizes": "512x512",
				"type": "image/png",
				"purpose": "maskable"
			});

			iconArray.push({
				"src": `${imageStr}?w=192&h=192&fit=fill&fm=png`,
				"sizes": "192x192",
				"type": "image/png",
				"purpose": "maskable"
			});
		}

		/** Shopify */
		if(img.indexOf("shopify") > -1 || img.indexOf("cdn/shop/files") > -1) {

			let imageStrArr = (img.indexOf("&width=") > -1) ? img.split("&width=") : img.split("_");
			let imageExtArr = (imageStrArr[1]) ? imageStrArr[1].split(".") : imageStrArr[0].split(".");

			imageStr = (img.indexOf("&width=") > -1) ? `${imageStrArr[0]}` : `${imageStrArr[0]}.${imageExtArr[1]}`;

			iconArray.push({
				"src": `${imageStr}?width=512&height=512`,
				"sizes": "512x512",
				"type": "image/png",
				"purpose": "maskable"
			});

			iconArray.push({
				"src": `${imageStr}?width=192&height=192`,
				"sizes": "192x192",
				"type": "image/png",
				"purpose": "maskable"
			});

			// TODO: Figure out how to force PNG here
		}

		manifest.icons = iconArray;
	}

	if(response?.data?.title) manifest.name = response.data.title;
	if(response?.data?.description) manifest.description = response.data.description;
	if(response?.data?.theme_background) manifest.background_color = response.data.theme_background;
	if(response?.data?.theme_accent) manifest.theme_color = response.data.theme_accent;

	// TODO: Service worker?
	// manifest.serviceworker = ...

	return new Response(`${JSON.stringify(manifest, null, 4)}`, {
		headers: {
			"Cache-Control": "max-age=0, s-maxage=43200",
			"Content-Type": "application/manifest+json"
		}
	});
};
