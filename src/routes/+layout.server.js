import { error } from "@sveltejs/kit";
import { get } from "svelte/store";
import { env } from "$env/dynamic/private";
import { Api } from "$api";
import { server } from "$lib/stores/content";
import { parseGoogleFonts } from "$js/_helpers/fonts";

export const prerender = "auto";

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
			"--settings-content-gap-x-mobile": serverStore?.settings?.data?.content_gap_base ? `${serverStore.settings.data.content_gap_base}px` : "16px",
			"--settings-content-gap-x-tablet": serverStore?.settings?.data?.content_gap_tb ? `${serverStore.settings.data.content_gap_tb}px` : "20px",
			"--settings-content-gap-x-desktop": serverStore?.settings?.data?.content_gap_dk ? `${serverStore.settings.data.content_gap_dk}px` : "24px",
			"--settings-content-gap-y-mobile": serverStore?.settings?.data?.content_gap_base ? `${serverStore.settings.data.content_gap_base}px` : "16px",
			"--settings-content-gap-y-tablet": serverStore?.settings?.data?.content_gap_tb ? `${serverStore.settings.data.content_gap_tb}px` : "20px",
			"--settings-content-gap-y-desktop": serverStore?.settings?.data?.content_gap_dk ? `${serverStore.settings.data.content_gap_dk}px` : "24px",
			"--settings-content-gutter-x-mobile": serverStore?.settings?.data?.content_gutter_base ? `${serverStore.settings.data.content_gutter_base}px` : "20px",
			"--settings-content-gutter-x-tablet": serverStore?.settings?.data?.content_gutter_tb ? `${serverStore.settings.data.content_gutter_tb}px` : "24px",
			"--settings-content-gutter-x-desktop": serverStore?.settings?.data?.content_gutter_dk ? `${serverStore.settings.data.content_gutter_dk}px` : "28px",
			"--settings-content-gutter-y-mobile": serverStore?.settings?.data?.content_gutter_base ? `${serverStore.settings.data.content_gutter_base}px` : "20px",
			"--settings-content-gutter-y-tablet": serverStore?.settings?.data?.content_gutter_tb ? `${serverStore.settings.data.content_gutter_tb}px` : "24px",
			"--settings-content-gutter-y-desktop": serverStore?.settings?.data?.content_gutter_dk ? `${serverStore.settings.data.content_gutter_dk}px` : "28px",
			"--settings-grid-gap-x-mobile": serverStore?.settings?.data?.grid_gap_base ? `${serverStore.settings.data.grid_gap_base}px` : "16px",
			"--settings-grid-gap-x-tablet": serverStore?.settings?.data?.grid_gap_tb ? `${serverStore.settings.data.grid_gap_tb}px` : "20px",
			"--settings-grid-gap-x-desktop": serverStore?.settings?.data?.grid_gap_dk ? `${serverStore.settings.data.grid_gap_dk}px` : "24px",
			"--settings-grid-gap-y-mobile": serverStore?.settings?.data?.grid_gap_base ? `${serverStore.settings.data.grid_gap_base}px` : "16px",
			"--settings-grid-gap-y-tablet": serverStore?.settings?.data?.grid_gap_tb ? `${serverStore.settings.data.grid_gap_tb}px` : "20px",
			"--settings-grid-gap-y-desktop": serverStore?.settings?.data?.grid_gap_dk ? `${serverStore.settings.data.grid_gap_dk}px` : "24px",
			"--settings-site-gutter-x-mobile": serverStore?.settings?.data?.site_gutter_base ? `${serverStore.settings.data.site_gutter_base}px` : "20px",
			"--settings-site-gutter-x-tablet": serverStore?.settings?.data?.site_gutter_tb ? `${serverStore.settings.data.site_gutter_tb}px` : "40px",
			"--settings-site-gutter-x-desktop": serverStore?.settings?.data?.site_gutter_dk ? `${serverStore.settings.data.site_gutter_dk}px` : "60px",
			"--settings-site-gutter-y-mobile": serverStore?.settings?.data?.site_gutter_base ? `${serverStore.settings.data.site_gutter_base}px` : "20px",
			"--settings-site-gutter-y-tablet": serverStore?.settings?.data?.site_gutter_tb ? `${serverStore.settings.data.site_gutter_tb}px` : "40px",
			"--settings-site-gutter-y-desktop": serverStore?.settings?.data?.site_gutter_dk ? `${serverStore.settings.data.site_gutter_dk}px` : "60px",
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
