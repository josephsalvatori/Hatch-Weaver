import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import { env } from "$env/dynamic/private";
import { Api } from "$api";
import { server } from "$lib/stores/content";
import { parseGoogleFonts } from "$js/_helpers/fonts";

export const trailingSlash = "always";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, locals, fetch, params, request, url }) {

	const serverStore = get(server);

	let response;

	/**
	 * Get Settings, and server-side cache
	 */
	// TODO: Write this into a "getMultiple"
	if(!serverStore.settings) {

		response = await Api.Content.getOne({
			fetch,
			request,
			type: "settings"
		});

		if(response?.id) {
			serverStore.settings = response;
		}
	}

	if(!serverStore.navigation) {

		response = await Api.Content.getOne({
			fetch,
			request,
			type: "navigation_settings"
		});

		if(response?.id) {
			serverStore.navigation = response;
		}
	}

	let fontObj, brandObj, varObj;

	/** Let's get our theme var settings */
	if(serverStore?.settings?.data) {

		fontObj = parseGoogleFonts({
			"--font-headline": serverStore?.settings?.data?.google_font_headlines,
			"--font-headline-alt": serverStore?.settings?.data?.google_font_headlines_alt,
			"--font-body": serverStore?.settings?.data?.google_font_body,
			"--font-body-alt": serverStore?.settings?.data?.google_font_body_alt
		});

		brandObj = {
			"--theme-color-background": serverStore?.settings?.data?.theme_background || "#FFFFFF",
			"--theme-color-accent": serverStore?.settings?.data?.theme_accent || "#000000",
			"--theme-color-font": serverStore?.settings?.data?.theme_font || "#222222",
			"--theme-color-button-background": serverStore?.settings?.data?.theme_button_background || "#222222",
			"--theme-color-button-accent": serverStore?.settings?.data?.theme_button_accent || "#000000",
			"--theme-color-button-font": serverStore?.settings?.data?.theme_button_font || "#FFFFFF",
			"--theme-color-placeholder": serverStore?.settings?.data?.theme_placeholder || "#F9F9F9"
		};

		varObj = {
			...brandObj,
			...fontObj?.styles
		};
	}

	return {
		analyticsId: env.VERCEL_ANALYTICS_ID,
		cssVars: varObj,
		googleFonts: (fontObj) ? fontObj : null,
		preview: cookies.get(env.CONTENT_PREVIEW_COOKIE),
		settings: serverStore,
		storefrontUrl: env.STOREFRONT_API_URL,
		userid: locals.userid,
		userAgent: (request.headers.get("user-agent") ? request.headers.get("user-agent").toLowerCase() : ""),
		token: locals.cat?.accessToken
	};
}
