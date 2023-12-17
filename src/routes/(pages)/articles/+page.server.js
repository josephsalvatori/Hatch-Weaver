import { error } from "@sveltejs/kit";
import { Api } from "$api";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	let response;
	let categories = [];

	try {

		response = await Api.Content.getOne({
			fetch,
			request,
			type: "page",
			uid: "articles"
		});

	} catch(err) {
		// throw error(404, "Page not found");
	}

	/** Get all categories */
	try {

		categories = await Api.Content.getMany({
			fetch,
			request,
			type: "category"
		});

	} catch(err) {

	}

	if(!response) {
		error(404, "Page not found");
	}

	return {
		page: response,
		categories: categories
	};
}