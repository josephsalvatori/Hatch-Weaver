import { dev } from "$app/environment";
import { MongoClient } from "mongodb";
import { MONGO_USER, MONGO_PASS, MONGO_URI } from "$env/static/private";

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: "nodejs18.x"
};

// TODO: UPDATE ALL MONGODB TO HTTP REQUESTS, REMOVE NODE DRIVER
// TODO: read up on params from docs
const PARAMS = (!dev) ? "retryWrites=true" : "retryWrites=true&w=majority"
const DB_CONNECTION = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/?${PARAMS}`;

const client = new MongoClient(DB_CONNECTION);

let clientPromise;
let clientCache;

if(dev) {

	if(!clientCache) clientCache = client.connect();

	clientPromise = clientCache;

} else {

	clientPromise = client.connect();
}

export const connectToDatabase = async () => {

	return await clientPromise;

	// if(clientCache) return clientCache;

	// try {

	// 	let mongoClient = new MongoClient(DB_CONNECTION);

	// 	clientCache = await mongoClient.connect();

	// 	return clientCache;

	// } catch(error) {

	// 	console.log("ERROR", error);
	// }
};

// export default await (await clientPromise)