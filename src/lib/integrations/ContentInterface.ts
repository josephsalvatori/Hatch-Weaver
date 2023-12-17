import { CONTENT_MODE } from "$env/static/private";
import { error } from "@sveltejs/kit";

interface ContentInterface {
	client: () => void;
	getOne: () => void;
	getMany: () => void;
}

class ContentObject implements ContentInterface {

	mode: string = CONTENT_MODE;
	url: string;
	routes: Array<Object>;

	client() {
		error(501, "Interface Error - Content needs client() definition");
	}

	async getOne() {

	}

	async getMany() {

	}
}

export default ContentObject;