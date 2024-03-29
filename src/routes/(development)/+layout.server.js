import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	/** Dev only */
	if(url.hostname !== "localhost" && url.hostname.indexOf(".vercel.app") <= -1) {

		throw redirect(302, "/");
	}

	return {};
}