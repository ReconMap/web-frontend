
interface NoteInterface {

	user_id?: number;
	visibility: string | undefined;
	parent_id?: number;
	parent_type?: string;
	content?: string;
}


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const Note : NoteInterface = {

	visibility: 'private',

}

export default Note;
