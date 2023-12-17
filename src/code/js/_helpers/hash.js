export const stringHash = (str) => {

	if(typeof crypto?.createHash === "object") return crypto.createHash("md5").update(str).digest("hex");

	let hash = 0;

	for(let i = 0; i < str.length; i++) {

		const char = str.charCodeAt(i);

		hash = (hash << 5) - hash + char;

		hash &= hash;
	}

	return new Uint32Array([hash])[0].toString(36);
};