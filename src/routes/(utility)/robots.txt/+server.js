/**
 * This is more for peace of mind, the server config is what actually blocks bots
 * @type {import('@sveltejs/kit').Get}
 */
export async function GET({url}) {
	return new Response(`# Spams server traffic, unsure of bad bot?
User-agent: MJ12bot
Disallow: /

# Bad bots, copy entire sites
User-agent: sitecheck.internetseer.com
User-agent: Zealbot
User-agent: MSIECrawler
User-agent: SiteSnagger
User-agent: WebStripper
User-agent: WebCopier
User-agent: Fetch
User-agent: Offline Explorer
User-agent: Teleport
User-agent: TeleportPro
User-agent: WebZIP
User-agent: linko
User-agent: HTTrack
User-agent: Microsoft.URL.Control
User-agent: Xenu
User-agent: larbin
User-agent: libwww
User-agent: ZyBORG
User-agent: Download Ninja
User-agent: k2spider
User-agent: NPBot
User-agent: WebReaper
User-agent: externalfacebookhit
Disallow: /

# Search engire releated bots
User-agent: DuckDuckBot
User-agent: googlebot
User-agent: Googlebot-Video
User-agent: AdsBot-Google
User-agent: Applebot
User-agent: bingbot
User-agent: msnbot
Allow: /
Crawl-delay: 1

# Social media related bots
User-agent: Pinterestbot
User-agent: FacebookBot
User-agent: facebookexternalua
User-agent: facebookexternalhit
User-agent: facebookexternalhit/1.1
User-agent: Twitterbot
Allow: /
Crawl-delay: 3

User-agent: *
Disallow: /account
Allow: /account/login
Disallow: /api
Disallow: /email
Disallow: /moduleguide
Disallow: /preview
Disallow: /slice-simulator
Disallow: /styleguide

Sitemap: sitemap.xml`);
};
