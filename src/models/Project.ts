
interface ProjectInterface {

	id?: number;
	creator_uid?: number;
	client_id?: number;
	name?: string;
	description?: string;
	visibility?: string;
	is_template: boolean;
	category_id?: number;
	engagement_start_date?: string;
	engagement_end_date?: string;
	external_id?: string;
	vulnerability_metrics?: string;
	management_summary?: string;
	management_conclusion?: string;
}


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const Project : ProjectInterface = {

	id: undefined,
	visibility: 'public',
	is_template: false,
}

export default Project;
