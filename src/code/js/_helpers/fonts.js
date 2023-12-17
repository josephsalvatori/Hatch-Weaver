

export const parseGoogleFonts = (object) => {

	let returnObj = {
		styles: {},
		fonts: {},
		url: null
	};

	Object.keys(object).forEach((a) => {

		let url = object[a];

		if(!url) return;

		let fontUrl = new URL(url);
		let font = fontUrl.searchParams.getAll("family");

		returnObj.styles[a] = [];

		[...font].forEach((f) => {

			let type;

			if(f.indexOf(":ital,wght@") > -1) {
				type = ":ital,wght@";
			} else if(f.indexOf(":ital@") > -1) {
				type = ":ital@";
			} else {
				type = ":wght@";
			}

			let fontSplit = f.split(type);
			let fontWeights = (fontSplit[1]) ? fontSplit[1].split(";") : [];
			let fontName = fontSplit[0];

			returnObj.fonts[fontName] = returnObj.fonts[fontName] || {};
			returnObj.fonts[fontName].font = returnObj.fonts[fontName].font || [];
			returnObj.styles[a].push(fontName);
			returnObj.fonts[fontName].font = returnObj.fonts[fontName].font.concat(fontWeights);
			returnObj.fonts[fontName].font = [...new Set(returnObj.fonts[fontName].font)];
			returnObj.fonts[fontName].type = type;
		});

		/** set up vars, account for spaces */
		returnObj.styles[a] = `"${returnObj.styles[a].join("\",\"")}"`;
	});

	returnObj.url = `https://fonts.googleapis.com/css2?`;

	Object.keys(returnObj.fonts).forEach((f) => {

		if(returnObj.url.indexOf("family") > -1) returnObj.url += "&";

		returnObj.url += `family=${f.replace(" ", "+")}${(returnObj.fonts[f].font.length > 0 ? returnObj.fonts[f].type + returnObj.fonts[f].font.join(";") : "")}`;
	});

	returnObj.url += "&display=swap";

	return returnObj;
};