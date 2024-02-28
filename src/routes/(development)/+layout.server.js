import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	console.log(url.hostname);

	/** Dev only */
	if(url.hostname !== "localhost" && url.hostname.indexOf("vercel.app") < 0) {

		throw redirect(302, "/");
	}

	return {};
}