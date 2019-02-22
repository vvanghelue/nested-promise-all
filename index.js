const flatten = require('flat')
const unflatten = require('flat').unflatten

module.exports = (nestedObject) => {
	const allPromises = []
	return new Promise((resolve, reject) => {

		const flattenedObject = flatten(nestedObject)
		const promises = Object.values(flattenedObject)

		// grab all promises and 
		return Promise.all(promises).then((promisesResults) => {
			Object.keys(flattenedObject).forEach((k, i) => {
				flattenedObject[k] = promisesResults[i]
			})
			resolve(unflatten(flattenedObject))
		})
	})
}