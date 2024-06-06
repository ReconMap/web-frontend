
interface UserInterface {

	id?: number;
	subject_id?: string;
	active?: boolean;
	full_name: string;
	short_bio?: string;
	username: string;
	email: string;
	role?: string;
}


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const User : UserInterface = {

	active: true,
	role: undefined,
}

export default User;
