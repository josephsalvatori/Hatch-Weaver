import { error } from "@sveltejs/kit";

interface DatabaseInterface {
	client: () => void;
}

class DatabaseObject implements DatabaseInterface {

	url: string;
	routes: Array<Object>;

	client() {
		error(501, "Interface Error - Database needs client() definition");
	}
}

export default DatabaseObject;