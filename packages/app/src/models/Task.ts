
interface Task {

	id?: number;
	project_id?: number;
	creator_uid?: number;
	assignee_uid?: number;
	insert_ts?: string;
	update_ts?: string;
	priority: string | undefined;
	summary: string | undefined;
	description?: string;
	status: string | undefined;
	due_date?: string;
	command_id?: number;
	command?: string;
	command_parser?: string;
}

export { Task };


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const defaultTask : Task = {

	priority: 'medium',
	summary: '',
	description: '',
	status: 'todo',
	due_date: undefined,

}

export default defaultTask;
