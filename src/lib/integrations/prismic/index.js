import { CONTENT_ACCESS_TOKEN, CONTENT_PREVIEW_TOKEN } from "$env/static/private";
import ContentObject from "$lib/integrations/ContentInterface";
import { error } from "@sveltejs/kit";
import * as prismic from "@prismicio/client";
import config from "../../../../slicemachine.config.json";

class Content extends ContentObject {

	#apiToken = CONTENT_ACCESS_TOKEN;
	#apiPreview = CONTENT_PREVIEW_TOKEN;

	constructor() {

		super();

		this.url = config.apiEndpoint;
		this.routes = config.routes;
	}

	/**
	 * client
	 * @param {*} fetch
	 * @param {*} request
	 * @returns
	 */
	client({ fetch, request } = {}) {

		let options = {
			accessToken: (this.#apiToken) ? this.#apiToken : undefined,
			routes: this.routes,
		};

		if(fetch) options.fetch = fetch;

		/** */
		const connection = prismic.createClient(this.url, options);

		/** */
		if(request) connection.enableAutoPreviewsFromReq(request);

		return connection;
	}

	graphQueryString(type) {

		let query;

		if(!type) return;

		const pageBuilderTypes = [
			"article",
			"home",
			"page",
			"product"
		];

		/** Get all access to Page Builder slice data */
		if(pageBuilderTypes.indexOf(type) > -1) {
			query = `{
				${type} {
					...${type}Fields
					${(type === "article") ? `category {
						...on category {
							...categoryFields
						}
					}` : ""}
					slices {
						...on carousel {
							variation {
								...on default {
									primary {
										...primaryFields
										section {
											...sectionFields
										}
									}
									items {
										...itemsFields
									}
								}
								...on articleRecirculation {
									primary {
										...primaryFields
										section {
											...sectionFields
										}
									}
									items {
										...itemsFields
									}
								}
							}
						}
						...on faqs {
							variation {
								...on default {
									primary {
										...primaryFields
									}
									items {
										...itemsFields
									}
								}
								...on with_media {
									primary {
										...primaryFields
									}
									items {
										...itemsFields
									}
								}
							}
						}
						...on html {
							variation {
								...on default {
									primary {
										...primaryFields
									}
								}
							}
						}
						...on marquee {
							variation {
								...on default {
									primary {
										...primaryFields
									}
									items {
										...itemsFields
									}
								}
								...on images {
									primary {
										...primaryFields
									}
									items {
										...itemsFields
									}
								}
							}
						}
						...on media {
							variation {
								...on default {
									primary {
										...primaryFields
									}
								}
								...on media_fullscreen {
									primary {
										...primaryFields
									}
								}
								...on media_split {
									primary {
										...primaryFields
									}
								}
							}
						}
						...on richtext {
							variation {
								...on default {
									primary {
										...primaryFields
									}
									items {
										...itemsFields
									}
								}
							}
						}
						...on section_group {
							variation {
								...on default {
									primary {
										...primaryFields
										section {
											...sectionFields
										}
									}
								}
							}
						}
					}
				}
			}`;
		}

		/** This is a special query to get navigation slices */
		if(type === "settings" || type === "ecommerce_settings") {

			query = `{
				${type} {
					...${type}Fields
				}
			}`;
		}

		if(type === "navigation_settings") {

			const linkFields = `
				...on link {
					variation {
						...on default {
							primary {
								...primaryFields
								link {
									...on page {
										title
									}
								}
							}
							items {
								...itemsFields
							}
						}
					}
				}
			`;

			const linkListFields = `
				...on link_list {
					variation {
						...on default {
							primary {
								...primaryFields
							}
							items {
								...itemsFields
							}
						}
						...on megaMenu {
							primary {
								...primaryFields
								flex_content {
									...flex_contentFields
								}
							}
							items {
								...itemsFields
							}
						}
					}
				}
			`;

			query = `{
				navigation_settings {
					...navigation_settingsFields
					slices_header {
						${linkFields}
						${linkListFields}
					}
					slices_header_utility {
						${linkFields}
						${linkListFields}
					}
					slices_footer {
						${linkFields}
						${linkListFields}
					}
					slices_footer_utility {
						${linkFields}
					}
				}
			}`;
		}

		return query;
	}

	/**
	 * getOne
	 * @param {*} fetch
	 * @param {*} request
	 * @param {*} type
	 * @param {*} uid
	 * @param {*} params
	 * @returns
	 */
	async getOne({ fetch, request, type, uid, params = {}} = {}) {

		const client = this.client({ fetch, request });

		if(!type) error(501, "Prismic Request - \"type\" is required");

		/** Get all access to Page Builder slice data */
		if(!params.graphQuery) params.graphQuery = this.graphQueryString(type);

		/** Debug */
		// console.log(params.graphQuery.replace(/\s\s+/g, " "));

		try {

			if(!uid) {
				return client.getSingle(type, params);
			}

			return client.getByUID(type, uid, params);

		} catch(error) {

			console.log("PRISMIC QUERY ERROR ~ ", error);

			return {};
		}
	}

	/**
	 * getMany
	 * @param {*} fetch
	 * @param {*} request
	 * @param {*} type
	 * @param {*} uids
	 * @param {*} params
	 * @returns
	 */
	async getMany({ fetch, request, type, uids, params = {}} = {}) {

		const client = this.client({ fetch, request });

		if(!type) error(501, "Prismic Request - \"type\" is required");

		/** Get all access to Page Builder slice data */
		if(!params.graphQuery) params.graphQuery = this.graphQueryString(type);

		try {

			if(!uids) {
				return client.getAllByType(type, params);
			}

			return client.getAllByUIDs(type, uids, params);

		} catch(error) {

			console.log("PRISMIC QUERY MANY ERROR ~ ", error);

			return {};
		}
	}

	/**
	 *
	 */
	// async getAll({})
}

export default Content;