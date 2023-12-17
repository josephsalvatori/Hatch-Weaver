import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";
import type { ListTypes } from "./types";

const client = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

export async function runJob(list: ListTypes): Promise<object> {

	try {

		// return the first element of the list, and remove it
		const job = await client.lpop<object>(list);

		// now trigger run

		return { list, job };

	} catch(error) {

		return error;
	}
};

export async function getJob(list: ListTypes, count: number = -1): Promise<object> {

	try {

		// return the first element of the list, and remove it
		const jobs = await client.lrange<object>(list, 0, count);

		// now trigger run

		return { list, jobs };

	} catch(error) {

		return error;
	}
}

export async function createJob(list: ListTypes, data: object): Promise<object> {

	try {

		// create list or append job to list
		const create = await client.lpush(list, JSON.stringify(data));

		return { created: "OK", index: create };

	} catch(error) {

		return error;
	}
};