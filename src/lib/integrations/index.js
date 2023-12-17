/**
 * Initial API configurations
 */
import Content from "$lib/integrations/prismic";

const config = {
	content: new Content(),
}

class ApiClass {

	constructor() {
		this.Content = config.content;
	}
}

export const Api = new ApiClass();