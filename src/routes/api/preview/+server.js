import * as prismic from "@prismicio/client";
import * as cookie from "cookie";
import Content from "$lib/integrations/prismic";

export async function GET({ url, fetch, request }) {

	const content = new Content();
	const client = content.client({ fetch, request });

	const previewToken = url.searchParams.get("token");
	const previewURL = await client.resolvePreviewURL({ defaultURL: "/" });

	const headers = new Headers({
		"Set-Cookie": cookie.serialize(prismic.cookie.preview, previewToken, {
			path: "/",
		}),
		location: previewURL,
	});

	const response = new Response(null, {
		status: 307,
		headers,
	});

	return response;
}