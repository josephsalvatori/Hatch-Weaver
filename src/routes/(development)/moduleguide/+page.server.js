import { error } from "@sveltejs/kit";

export const prerender = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	return {};
}