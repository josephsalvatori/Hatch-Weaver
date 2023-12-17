import { error, redirect } from "@sveltejs/kit";
import { Api } from "$api";
import * as prismic from "@prismicio/client";

/** @type {import('../../$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	let response;
	let previewCookie = cookies.get(prismic.cookie.preview);

	/** Redirect to home if accessed outside of preview */
	if(!previewCookie) redirect(302, "/");

	/**
	 * The preview route is reserved for Section groups, and would need to redirect in a non-preview environment
	 */
	try {

		response = await Api.Content.getOne({
			fetch,
			request,
			type: "section",
			uid: params.uid
		});

	} catch(err) {

		error(404, err.message);
	}

	if(!response) {
		error(404, "Page not found");
	}

	return {
		page: response
	};
}