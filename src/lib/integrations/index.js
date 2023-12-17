/**
 * Initial API configurations
 */
import Content from "$lib/integrations/prismic";
import Database from "$lib/integrations/mongodb";

const config = {
	content: new Content(),
	database: new Database()
}

class ApiClass {

	constructor() {
		this.Content = config.content;
		this.Database = config.database;
	}
}

export const Api = new ApiClass();