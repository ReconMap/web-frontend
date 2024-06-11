
interface ReportInterface {

	id?: number;
	projectId?: number;
	generatedByUid?: number;
	is_template?: boolean;
	insertTs?: string;
	versionName?: string;
	versionDescription?: string;
}


/**
 * Autogenerated file, do not edit manually. @see https://github.com/reconmap/model-definitions
 */
const Report : ReportInterface = {

	id: undefined,
	projectId: undefined,
	generatedByUid: undefined,
	is_template: false,
	insertTs: undefined,
	versionName: undefined,
	versionDescription: undefined,

}

export default Report;