import { slugify, slugifyFlat } from "$js/_helpers/slugify";

const normalize = {
	"first_name": [
		"billtofirstname",
		"fname",
		"firstn",
		"firstname",
	],
	"last_name": [
		"billtolastname",
		"lname",
		"lastn",
		"lastname",
	],
	"address_1": [
		"addr",
		"addr1",
		"address",
		"address1",
		"billingaddress1",
		"billtoaddress1",
		"street",
		"streetaddress",
	],
	"address_2": [
		"addr2",
		"address2",
		"billingaddress2",
		"billtoaddress2",
	],
	"birthday": [
		"birth",
		"birthday",
		"datebirth",
		"dateofbirth",
		"dob",
	],
	"city": [
		"billingcity",
		"billtocity",
		"city",
	],
	"last_activity": [
		"updatedat",
		"lastupdate"
	],
	"province": [
		"billingprovince",
		"billtoprovince",
		"province",
		"state",
		"stateregion",
	],
	"provincecode": [
		"billtoprovincecode",
		"provincecode"
	],
	"country": [
		"billingcountry",
		"country",
		"countryregion",
		"region",
	],
	"countrycode": [
		"billtocountrycode",
		"countrycode",
	],
	"zip": [
		"billingzip",
		"billtopostalcode",
		"postal",
		"postalcode",
		"zip",
	],
	"email": [
		"billtoemail",
		"email",
		"emailaddress",
	],
	"phone": [
		"billingphone",
		"billtophone",
		"mobilephonenumber",
		"phone",
		"phonenumber",
	],
	"ip": [
		"ip",
		"ipaddress",
		"remoteip"
	]
};

/** GET HEADERS MATCHUP SEPERATELY */
export const parseCsvHeaders = (array) => {

};

export const parseCsv = (array, mode = "display", reference = null) => {

	let referenceKeys = {};
	let structuredData = [];
	let matchedKeys = {};

	/** Assume first row is headers */
	let headerArray = array[0];

	/** If reference is passed, parse raw data off new reference */
	if(reference) referenceKeys = reference;

	[...headerArray].forEach((v, i) => {

		/** Loop through our keys to find matched headers, return index */
		Object.keys(normalize).forEach((k, j) => normalize[k].includes(slugifyFlat(v)) ? (reference ? matchedKeys[k] = v : (referenceKeys[k] = i, matchedKeys[k] = v)) : false);
	});

	let missingKeys = [...Object.keys(normalize)].filter((v) => ![...Object.keys(referenceKeys)].includes(v));

	/** If no headers match our config, let's pause, return an array with blanks */
	if(Object.keys(referenceKeys).length <= 0) {

		console.log("NOTHING IN REFKEY", referenceKeys);

		// return;
	}

	/** Let's structure our object */
	[...array].forEach((v, i) => {

		if(i === 0) return;

		let row = {};

		// TODO: Sanitize sting function for object; like format phone
		Object.keys(normalize).forEach((k, j) => referenceKeys[k] ? (v[referenceKeys[k]]) ? row[k] = v[referenceKeys[k]].toLowerCase() : false : false);

		if(Object.keys(row).length > 0) structuredData.push(row);
	});

	// TODO: -> Determine Data type of each field, store in array
	// TODO: -> Clear any columns that have 0 data in the whole table
	let rawFieldTypes = {};

	/** Dedupe */
	// TODO: Maybe move dedupe to bg process?
	structuredData = structuredData.filter((v, i, a) => a.findIndex(v2 => Object.keys(normalize).every(k => v2[k] === v[k])) === i);

	console.log("DATASET", { structuredData, referenceKeys, matchedKeys, missingKeys, mode, headers: headerArray })

	return { structuredData, referenceKeys, matchedKeys, missingKeys, mode, headers: headerArray };
};