import { dev } from "$app/environment";
export const processImages = (options) => {

	// Defaults
	const defaultOptions = {
		breakpoint: 768,
		quality: 90,
		src: "/images/placeholder.png",
		srcMobile: null,
		width: 2048,
		widths: [20, 200, 400, 800, 1200, 1600, 1880]
	};

	// Variables
	let {
		breakpoint,
		quality,
		src,
		srcMobile,
		width,
		widths
	} = {
		...defaultOptions,
		...options
	};

	// fallback for mobile dedicated src
	if(!srcMobile) srcMobile = src;

	// return base object if all we need is a placeholder
	if(!src || src === defaultOptions.src) {

		return {
			raw: [defaultOptions.src],
			base: defaultOptions.src,
			placeholder: defaultOptions.src,
			set: defaultOptions.src
		};
	}

	if(src.indexOf(".svg") > -1) {

		return {
			raw: [src],
			base: src,
			placeholder: src,
			set: src
		};
	}

	// process
	let fnKey = Object.keys(output).filter((v) => src.includes(v));
	let fn = output[fnKey + (dev ? "dev" : "")];
	let closestSize = widths.reduce((prev, cur) => (Math.abs(cur - width) < Math.abs(prev - width) ? cur : prev));
	let closest = fn({ src, srcMobile, breakpoint, quality, size: closestSize });
	let images = widths.map(size => fn({ src, srcMobile, breakpoint, quality, size }));
	let plchldr = fn({ src, srcMobile, breakpoint, quality, size: widths[0] })

	return {
		raw: images,
		base: closest.split(" ")[0],
		placeholder: plchldr.split(" ")[0],
		set: images.join(", ")
	};
};

export const output = {
	prismic: ({ src, srcMobile, breakpoint = 768, quality = 90, size }) => ((size > breakpoint) ? `/_vercel/image?url=${encodeURIComponent(src + `&w=${size}`)}&w=${size}&q=${quality} ${size}w` : `/_vercel/image?url=${encodeURIComponent(srcMobile + `&w=${size}`)}&w=${size}&q=${quality} ${size}w`),
	prismicdev: ({ src, srcMobile, breakpoint = 768, quality = 90, size }) => ((size > breakpoint) ? `${src}&w=${size} ${size}w` : `${srcMobile}&w=${size} ${size}w`),
	shopify: ({ src, srcMobile, breakpoint = 768, size }) => {

		// TODO: Does/Should this have a vercel output?
		const shopImage = (url, width) => {

			let imgArr = url.split(".");
			let ext = imgArr.pop();

			return `${imgArr.join(".")}_${width}x.${ext}`;
		};

		return (size > breakpoint) ? `${shopImage(src, size)} ${size}w` : `${shopImage(srcMobile, size)} ${size}w`
	},
	shopifydev: ({ src, srcMobile, breakpoint = 768, size }) => {

		const shopImage = (url, width) => {

			let imgArr = url.split(".");
			let ext = imgArr.pop();

			return `${imgArr.join(".")}_${width}x.${ext}`;
		};

		return (size > breakpoint) ? `${shopImage(src, size)} ${size}w` : `${shopImage(srcMobile, size)} ${size}w`
	}
};