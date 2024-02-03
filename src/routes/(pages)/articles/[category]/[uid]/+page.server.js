import { error } from "@sveltejs/kit";
import { Api } from "$api";
import { findTwitterHandle } from "$js/_helpers/strings";
import { asText } from "@prismicio/client";

/** @type {import('./$types').EntryGenerator} */
export async function entries() {

	let entries = await Api.Content.getMany({
		type: "article",
		params: {
			pageSize: 100
		}
	});

	let routes = entries.map((entry) => ({ uid: entry.uid }));
	// TODO: Check for pagination here.

	return routes;
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, parent, request, url }) {

	let response;
	let parentData = await parent();

	try {

		response = await Api.Content.getOne({
			fetch,
			request,
			type: "article",
			uid: params.uid
		});

	} catch(err) {

		error(404, "Page not found");
	}

	if(!response) {
		error(404, "Page not found");
	}

	const titleAppend = parentData?.settings?.settings?.data?.title ? ` | ${parentData.settings.settings.data.title}` : "";
	const metaTags = {
		title: (response.data?.meta_title ? response.data.meta_title : asText(response.data.title)),
		titleTemplate: (response.data?.category?.data?.title[0]) ? `%s | ${asText(response.data.category.data.title)}${titleAppend}` : undefined,
		canonical: response.data?.canonical,
		description: response.data?.meta_description,
		openGraph: {
			url: response.data?.canonical || `${url.origin}${url.pathname}`,
			title: `${(response.data?.meta_title ? `${response.data.meta_title}${titleAppend}` : asText(response.data.title))}${titleAppend}`,
			type: "website",
			images: response.data?.meta_image?.url ? [{
				url: response.data.meta_image.url,
				alt: response.data.meta_image.alt,
				height: response.data.meta_image.dimensions.height,
				width: response.data.meta_image.dimensions.width
			}] : [],
			site_name: parentData?.settings?.settings?.data?.title
		},
		twitter: {
			cardType: (response.data?.meta_image?.url) ? "summary_large_image" : "summary",
			site: findTwitterHandle(parentData?.settings?.settings?.data?.twitter_url?.url),
			description: response.data?.meta_description,
			title: `${(response.data?.meta_title ? `${response.data.meta_title}${titleAppend}` : asText(response.data.title))}${titleAppend}`,
			image: response.data?.meta_image?.url,
			imageAlt: response?.data?.meta_image?.alt
		}
	};

	return {
		page: response,
		meta: metaTags
	};
}