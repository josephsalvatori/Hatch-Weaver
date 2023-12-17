<script>
import { page } from "$app/stores";
import { refs } from "$js/_helpers/refs";
import { slugify } from "$js/_helpers/slugify";

export let props = {};
export let type = props.type || "button";
export let href = props.href || undefined;
export let style = "";

const btnStyle = refs.buttonStyles[slugify(style)];
</script>

<!--
@component
Component ~ Button
-->

<template>
	{#if href}
		{@const path = href.split("?")}
		{@const isPage = ($page.url.href === path[0] || $page.url.pathname === path[0])}
		<a class="{btnStyle}" class:is-page={isPage} href={href} {...props} on:click>
			<slot />
		</a>
	{:else}
		<button class="{btnStyle}" type={type} {...props} on:click>
			<slot />
		</button>
	{/if}
</template>