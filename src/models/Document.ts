

interface DocumentInterface {

	user_id?: number;
	visibility: string;
	parent_id?: number;
	parent_type?: string;
	content?: string;
	title?: string;
}

/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/pocoglot-definitions
 */
const Document : DocumentInterface = {

	visibility: 'private',
}

export default Document;
