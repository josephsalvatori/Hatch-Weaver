import { error } from "@sveltejs/kit";
import { Api } from "$api";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	let response;
	let articles;

	try {

		response = await Api.Content.getOne({
			fetch,
			request,
			type: "category",
			uid: params.category
		});

	} catch(err) {
		error(404, "Page not found");
	}

	/** Get all articles by category */
	try {

		// response = await Api.Content.getOne({
		// 	fetch,
		// 	request,
		// 	type: "category",
		// 	uid: params.category
		// });

	} catch(err) {

	}

	if(!response) {
		error(404, "Page not found");
	}

	return {
		page: response
	};
}

