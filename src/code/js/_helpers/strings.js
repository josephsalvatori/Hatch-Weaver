export const truncate = (string, chars = 200, append = " &hellip;") => {

	if(string.length <= chars) return string;

	return string.slice(0, string.indexOf(" ", chars)) + append;
}

export const findTwitterHandle = (string) => {

	if(!string) return;

	let match = string.match(/^https?:\/\/(www\.)?twitter.com\/@?(?<handle>\w+)/);

	if(match?.groups?.handle) return `@${match.groups.handle}`;

	return;
};

/**
 * Prismic serializer for RichText fields
 */
export const richTextSerializer = {
	preformatted: ({ node }) => {

		if(node.text.indexOf("<table") === 0 && node.text.indexOf("</table>" > 0)) {

			let htmlStr = `<div class="table-wrapper">${node.text.replace("\r", "").replace("\n", "").replace("&nbsp;", "").trim()}</div>`;

			return htmlStr;
		}

		return `<pre>${node.text}</pre>`;
	}
};

export const toTitleCase = (string) => {

	let smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
	let alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
	let wordSeparators = /([ :–—-])/;

	return string.split(wordSeparators).map((c, i, a) => {

		if(c.search(smallWords) > -1 && i !== 0 && i !== a.length && array[i - 3] !== ":" && array[i + 1] !== ":" && (array[i + 1] !== "-" || (array[i - 1] === "-" && a[i + 1] === "-"))) {
			return c.toLowerCase();
		}

		if(c.substr(1).search(/[A-Z]|\../) > -1) return c;
		if(a[i + 1] === ":" && a[i + 2] !== "") return c;

		return c.replace(alphanumericPattern, (match) => match.toUpperCase());
	}).join("");
};