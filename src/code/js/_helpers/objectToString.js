

/**
 * This will preserve object structure for graphQL queries (no "" around props)
 * @param {*} param0
 * @returns
 */
export const objectToString = ({ object = {}, delimiter = ", ", array = [] }) => {

	let returnArray = array;

	/** Will need to be recursive with this */
	Object.keys(object).map((o) => {

		let mode = typeof object[o];

		if(Array.isArray(object[o])) {
			mode = "array";
		}

		switch(mode) {

			case "string":

				returnArray.push(`${o}: "${object[o]}"`);

				break;

			case "float":
			case "number":

				returnArray.push(`${o}: ${object[o]}`);

				break;

			case "object":

				let nextString;

				if(Array.isArray(object)) {
					nextString = `{ ${objectToString({ object: object[o] })} }`;
				} else {
					nextString = `${o}: { ${objectToString({ object: object[o] })} }`;
				}

				returnArray.push(nextString);

				break;

			case "boolean":

				returnArray.push(`${o}: ${object[o]}`);

				break;

			case "array":

				returnArray.push(`${o}: [${objectToString({ object: object[o] })}]`);

				break;

			default:

				break;
		}

		return "";
	});

	let string = returnArray.join(delimiter);

	return string;
};

