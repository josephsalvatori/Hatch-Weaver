<script>
import { page } from "$app/stores";
import IconSocialFacebook from "$lib/components/molecules/icons/IconSocialFacebook.svelte";
import IconSocialLinkedIn from "$lib/components/molecules/icons/IconSocialLinkedIn.svelte";
import IconSocialInstagram from "$lib/components/molecules/icons/IconSocialInstagram.svelte";
import IconSocialTiktok from "$lib/components/molecules/icons/IconSocialTiktok.svelte";
import IconSocialTwitter from "$lib/components/molecules/icons/IconSocialTwitter.svelte";
import IconSocialYoutube from "$lib/components/molecules/icons/IconSocialYoutube.svelte";
import Grid from "$lib/components/slots/Grid.svelte";
import { asLink, asText, isFilled } from "@prismicio/helpers";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

let contentFontColor = ($page.data.settings.navigation?.data?.navigation_font_color) ? refs.colors[slugify($page.data.settings.navigation.data.navigation_font_color)] : "var(--color-brand-text)";
let contentBackgroundColor = ($page.data.settings.navigation?.data?.navigation_background_color) ? refs.colors[slugify($page.data.settings.navigation.data.navigation_background_color)] : "var(--color-brand-background)";
</script>

<footer>
	<div class="ca bg-[var(--background-color)] text-[color:var(--text-color)]" style="--background-color: {contentBackgroundColor}; --text-color: {contentFontColor};">
		<!-- <Grid max={2}>
			<div>
				<div>LOGO?</div>
				<div>TAGLINE?</div>
			</div>
			<div>NEWSLETTER?</div>
		</Grid>
		<div class="border-b border-current ct w-full"></div> -->
		<div class="dk:flex dk:justify-between dk:items-start">
			<navigation aria-label="Footer Navigation" class="w-full">
				<Grid max={4} min={2}>
					{#if isFilled.sliceZone($page?.data?.settings?.navigation?.data?.slices_footer)}
						{#each $page.data.settings.navigation.data.slices_footer as navList}
							{@const type = navList.slice_type}
							{@const variation = navList.variation}
							<div>
								{#if navList.primary?.link?.url}
									<div class="h6 mb-[var(--content-gutter)]">{navList.primary.menu_text || (navList.primary.link?.data?.title ? asText(navList.primary.link?.data?.title) : navList.primary.link.uid)}</div>
								{:else}
									{#if navList.primary.menu_text}
										<div class="h6 mb-[var(--content-gutter)]">{navList.primary.menu_text}</div>
									{/if}
								{/if}
								<ul>
									{#if type === "link"}
										<li class="text-[length:24px] mr-[var(--content-gap)]"><a class:btn={(navList.primary.link_style === "button")} href={asLink(navList.primary.link)}>{navList.primary.link_text || (navList.primary.link?.data?.title ? asText(navList.primary.link?.data?.title) : navList.primary.link.uid)}</a></li>
									{:else if type === "link_list"}
										{#if variation === "default" && isFilled.group(navList.items)}
											{#each navList.items as listItem}
												{#if listItem.link?.url}
													<li class="text-[length:24px]"><a href={asLink(listItem.link)}>{listItem.link_text || (listItem.link?.data?.title ? asText(listItem.link?.data?.title) : listItem.link.uid)}</a></li>
												{/if}
											{/each}
										{/if}
									{/if}
								</ul>
							</div>
						{/each}
					{/if}
				</Grid>
			</navigation>
			<ul class="dk:ml-[var(--content-gutter)] flex items-center [&>*]:ml-[var(--content-gutter)] [&>:first-child]:ml-0 max-w-full">
				{#if $page.data?.settings?.settings?.data?.linked_in_url?.url}
					<li><a class="block w-[30px]" href="{asLink($page.data.settings.settings.data.linked_in_url)}" target="_blank" rel="noopener" aria-label="LinkedIn"><IconSocialLinkedIn size={"30"} strokeWidth={0} /></li>
				{/if}
				{#if $page.data?.settings?.settings?.data?.facebook_url?.url}
					<li><a class="block w-[30px]" href="{asLink($page.data.settings.settings.data.facebook_url)}" target="_blank" rel="noopener" aria-label="Facebook"><IconSocialFacebook size={"30"} strokeWidth={0} /></li>
				{/if}
				{#if $page.data?.settings?.settings?.data?.instagram_url?.url}
					<li><a class="block w-[30px]" href="{asLink($page.data.settings.settings.data.instagram_url)}" target="_blank" rel="noopener" aria-label="Facebook"><IconSocialInstagram size={"30"} strokeWidth={0} /></li>
				{/if}
				{#if $page.data?.settings?.settings?.data?.tiktok_url?.url}
					<li><a class="block w-[30px]" href="{asLink($page.data.settings.settings.data.tiktok_url)}" target="_blank" rel="noopener" aria-label="Facebook"><IconSocialTiktok size={"30"} strokeWidth={0} /></li>
				{/if}
				{#if $page.data?.settings?.settings?.data?.twitter_url?.url}
					<li><a class="block w-[30px]" href="{asLink($page.data.settings.settings.data.twitter_url)}" target="_blank" rel="noopener" aria-label="Facebook"><IconSocialTwitter size={"30"} strokeWidth={0} /></li>
				{/if}
				{#if $page.data?.settings?.settings?.data?.youtube_url?.url}
					<li><a class="block w-[30px]" href="{asLink($page.data.settings.settings.data.youtube_url)}" target="_blank" rel="noopener" aria-label="Facebook"><IconSocialYoutube size={"30"} strokeWidth={0} /></li>
				{/if}
			</ul>
		</div>
		<div class="border-b border-current ct w-full tb:hidden"></div>
		<div class="ct flex flex-col-reverse tb:flex-row items-start tb:justify-between pt-[var(--content-gutter)]">
			<small>Copyright &copy; {new Date().getFullYear()} {($page.data?.settings?.settings?.data?.organization_legal_name || $page.data?.settings?.settings?.data?.organization_name) ? ($page.data?.settings?.settings?.data?.organization_legal_name || $page.data?.settings?.settings?.data?.organization_name) + "," : ""} All Rights Reserved</small>
			{#if isFilled.sliceZone($page?.data?.settings?.navigation?.data?.slices_footer_utility)}
				<navigation aria-label="Utility Navigation">
					<div class="flex h-full items-center whitespace-nowrap">
						{#each $page.data.settings.navigation.data.slices_footer_utility as navList}
							{#if navList.primary?.link?.url}
								<small class="mr-[var(--content-gap)] mb-[var(--content-gap)] tb:mb-0"><a class:btn={(navList.primary.link_style === "button")} href={asLink(navList.primary.link)}>{navList.primary.link_text || (navList.primary.link?.data?.title ? asText(navList.primary.link?.data?.title) : navList.primary.link.uid)}</a></small>
							{/if}
						{/each}
					</div>
				</navigation>
			{/if}
		</div>
	</div>
</footer>