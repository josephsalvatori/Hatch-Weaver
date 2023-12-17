export const chunkArray = (array = [], size = 6, offset = 0) => {

	array = (array.length > size ? [array.slice(offset, size), ...chunkArray(array.slice(size), size)] : [array]);

	return array;
};