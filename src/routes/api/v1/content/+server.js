import { json } from "@sveltejs/kit";
import { Api } from "$api";
import * as prismic from "@prismicio/client";

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, request, url }) {

	let returnObj = {
		data: {},
		errors: []
	};

	let params = url.searchParams;

	if(!params) {

		returnObj.errors.push({
			message: "Query parameters required to get content"
		});

		return json(returnObj);
	}

	let type = params.get("type");
	let sort = params.get("sortBy");
	let direction = (params.get("sortOrder") === "asc" ? "asc" : "desc");
	let filter = params.get("filter");
	let filterBy = params.get("filterBy");

	if(!sort) sort = "first_publication_date";

	let search = await Api.Content.getMany({
		fetch,
		request,
		type,
		params: {
			filters: [
				`[at(my.${type}.${filter}, "${filterBy}")]`
			],
			orderings: [{ field: `my.${type}.${sort}`, direction: direction }]
		}
	}).catch(err => {
		console.log(err);
	});

	if(search) returnObj.data = search;

	return json(returnObj);
};
