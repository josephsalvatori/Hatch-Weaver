import { dev } from "$app/environment";
import { MONGODB_API_KEY } from "$env/static/private";
import DatabaseObject from "$lib/integrations/DatabaseInterface";
// import { connectToDatabase } from "$lib/integrations/mongodb/client";

class Database extends DatabaseObject {

	constructor() {

		super();

		this.client = null;
		this.databases = {};

		// this.connect();

		this.version = "v1";
		this.endpoint = `https://data.mongodb-api.com/app/data-mddqf/endpoint/data/${this.version}/action`;
		this.default = {
			dataSource: "Development",
			database: "Accounts",
			collection: ""
		};
		this.headers = {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"apiKey": MONGODB_API_KEY
		};
	}

	/**
	 * @param {function} fetch
	 * @param {string} action MongoDB request
	 * @param {object} request
	 * @returns
	 */
	async query({ fetch, action = "findOne", query = {}} = {}) {

		if(!fetch) return;

		try {

			const data = fetch(`${this.endpoint}/${action}`, {
				method: "POST",
				headers: this.headers,
				body: JSON.stringify({...this.default, ...query})
			});

			return data;

		} catch(error) {

			console.log("REQUEST ERROR", error);

			return error;
		}
	}

	// /**
	//  * client
	//  * @returns
	//  */
	// connect() {

	// 	if(!!this.client) return this.client;

	// 	let dbConnect = connectToDatabase();

	// 	console.log(dbConnect);

	// 	this.client = dbConnect.then((data) => console.log("Data", data));
	// }

	// openDatabase(name) {

	// 	if(this.databases[name]) return this.databases[name];

	// 	this.databases[name] = this.client.db(name);

	// 	return this.databases[name];
	// }
}

export default Database;