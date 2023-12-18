import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import { env } from "$env/dynamic/private";
import { Api } from "$api";
import { server } from "$lib/stores/content";
import { parseGoogleFonts } from "$js/_helpers/fonts";

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
			"--theme-color-background": serverStore?.settings?.data?.brand_background_1 || "#232F3B",
			"--theme-color-background-alt": serverStore?.settings?.data?.brand_background_2 || "#212120",
			"--theme-color-font": serverStore?.settings?.data?.brand_text_1 || "#E4E4E4",
			"--theme-color-font-alt": serverStore?.settings?.data?.brand_text_2 || "#FEFEFE",
			"--theme-color-accent-1": serverStore?.settings?.data?.brand_accent_1 || "#232F3B",
			"--theme-color-accent-2": serverStore?.settings?.data?.brand_accent_2 || "#384F55",
			"--theme-color-accent-3": serverStore?.settings?.data?.brand_accent_3 || "#8B9DA0",
			"--theme-color-accent-4": serverStore?.settings?.data?.brand_accent_4 || "#8A5033",
			"--theme-color-accent-5": serverStore?.settings?.data?.brand_accent_5 || "#C39F87",
			"--theme-color-accent-6": serverStore?.settings?.data?.brand_accent_6 || "#E4E4E4",
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
