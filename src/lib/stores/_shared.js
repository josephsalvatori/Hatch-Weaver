import { getContext, hasContext, setContext } from "svelte";
import { readable, writable } from "svelte/store";

/** Context for any type of store */
export const useSharedStore = (name, fn, defaultValue) => {

	if(hasContext(name)) return getContext(name);

	const _value = fn(defaultValue);

	setContext(name, _value);

	return _value;
};

/** Writable store context */
export const useWritable = (name, value) => useSharedStore(name, writable, value);

/** Readable store context */
export const useReadable = (name, value) => useSharedStore(name, readable, value);