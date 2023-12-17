

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, params, request, url }) {

	let searchParams = url.searchParams;

	let per_page = searchParams.get("per_page") || 100;
	let page = searchParams.get("page") || 1;
	let sort = searchParams.get("sort") || "newest";
	let plan = searchParams.get("plan") || "standard";
	let query = searchParams.get("query") || "";
	let filter = searchParams.get("filter") || "";

	let today = new Date();

	let rss = [];


	return new Response(
	`<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0"
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:wfw="http://wellformedweb.org/CommentAPI/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
		xmlns:tv="https://showrss.info"
		xmlns:webfeeds="http://webfeeds.org/rss/1.0"
		xmlns:media="http://search.yahoo.com/mrss/">
		<channel>
			<title></title>
			<atom:link href="${url.origin}/rss/feed" rel="self" type="application/rss+xml"></atom:link>
			<webfeeds:accentColor>FEEA3B</webfeeds:accentColor>
			<webfeeds:analytics id="G-6C97G3S3W5" engine="GoogleAnalytics"></webfeeds:analytics>
			<link>${website}</link>
			<description>Independent, ad-free, uncensored comedy. Watch new episodes of Dimension 20, Um, Actually, Game Changer every week.</description>
			<lastBuildDate>${moment().format("ddd, DD MMM YYYY HH:mm:ss ZZ")}</lastBuildDate>
			<language>en-US</language>
			<sy:updatePeriod>daily</sy:updatePeriod>
			<sy:updateFrequency>1</sy:updateFrequency>
			${rss.map((item) => {

				// let title = item.title.replace("[", "(").replace("]", ")");
				// let description = item.short_description.replace("'", "’") || item.description.replace("'", "’");
				// let shortDescription = item.short_description.replace("'", "’") || item.description.replace("'", "’");
				// let seasonNumber = (item.season_number?.length === 1 ? `S0${item.season_number}` : `S${item.season_number}`);
				// let episodeNumber = (item.episode_number?.length === 1 ? `E0${item.episode_number}` : `E${item.episode_number}`);
				// let seriesName = item.metadata?.series_name || "";

				// if(!item.season_number) seasonNumber = "S01";
				// if(!item.episode_number) episodeNumber = "E01";

				// let rawTitle = (`${seriesName} ${seasonNumber + episodeNumber} ${item.title}`).trim();
				// let image = item.thumbnail?.source;
				// let imageMimeType = (image.indexOf("jpg") > -1 || image.indexOf("jpeg")) > -1 ? "image/jpeg" : "image/png";
				// let subtitleTrack = "";

				// if(item.tracks?.subtitles[0]?._links?.srt?.href) subtitleTrack = `<media:subTitle type="application/x-subrip" lang="en-us" href="${item.tracks?.subtitles[0]?._links?.srt?.href}"></media:subTitle>`;

				// let mediaGroupLines = `
				// 	<media:content lang="en" duration="${item.duration?.seconds}" isDefault="true">
				// 		<media:player url="${videoUrl}${item.url}"></media:player>
				// 		${subtitleTrack}
				// 	</media:content>
				// 	<media:content url="${image + "?" + encodeURIComponent("w=600&h=340&fit=crop")}" medium="image" type="${imageMimeType}"></media:content>
				// 	<media:title type="plain">${title}</media:title>
				// 	<media:rating scheme="urn:simple">adult</media:rating>
				// 	<media:description type="plain"><![CDATA[${shortDescription}]]></media:description>
				// 	<media:thumbnail url="${image}"></media:thumbnail>
				// 	<media:community>
				// 		<media:statistics views="${item.plays_count}"></media:statistics>
				// 	</media:community>
				// `;

				// if(item.tags && item.tags.length > 0) mediaGroupLines += `<media:keywords><![CDATA[${item.tags.join(", ").replace("'", "’").trim()}]]></media:keywords>`;

				// let string = `<item>
				// 	<title>${title}</title>
				// 	<link>${videoUrl}${item.url}</link>
				// 	<pubDate>${moment(item.time_available).format("ddd, DD MMM YYYY HH:mm:ss ZZ")}</pubDate>
				// 	<dc:creator><![CDATA[Dropout]]></dc:creator>
				// 	<guid isPermaLink="false">${guidUrl}${item.id}</guid>
				// 	<description><![CDATA[${shortDescription}]]></description>
				// 	<content:encoded><![CDATA[
				// 		<img src="${image}?w=600&h=340&fit=crop" alt="${title}" width="600" height="340" />
				// 		<p>${description}</p>
				// 	]]></content:encoded>
				// 	<media:group>${mediaGroupLines}</media:group>
				// 	<webfeeds:featuredImage url="${image}" type="${imageMimeType}"></webfeeds:featuredImage>
				// 	<tv:raw_title>${rawTitle}</tv:raw_title>
				// 	<tv:episode_id>${item.id}</tv:episode_id>
				// `;

				// if(item.metadata?.series_id) string += `<tv:show_id>${item.metadata.series_id}</tv:show_id>`;
				// if(item.metadata?.series_name) string += `<tv:show_name>${item.metadata.series_name}</tv:show_name>`;
				// if(item.season_number) string += `<tv:season_number>${item.season_number}</tv:season_number>`;
				// if(item.episode_number) string += `<tv:episode_number>${item.episode_number}</tv:episode_number>`;

				// string += `</item>`;

				// return string;

			}).join("")}
		</channel>
	</rss>`.trim(),
	{
		headers: {
			"Cache-Control": "max-age=0, s-maxage=43200",
			"Content-Type": "application/xml"
		}
	});
}