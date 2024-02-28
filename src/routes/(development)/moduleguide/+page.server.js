import { error, redirect } from "@sveltejs/kit";

export const prerender = false;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch, params, request, url }) {

	return {};
}