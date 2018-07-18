const TYPES = [
	'REQUEST',
	'SUCCESS',
	'FAILURE',
	'CANCEL',
	'RESET',
]

const generateActionTypes = base => {
	const ref = {}

	TYPES.forEach((type) => {
			ref[type] = `${base}_${type}`
	});

	return ref;
}

export default generateActionTypes;