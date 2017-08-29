/**
 * @param {any[]} jsonObj
 */
module.exports.reemplaceNull = (jsonObj) => {
	jsonObj.map(item => {
		var obj = {}
		for (var key in item) {
			if (item.hasOwnProperty(key)) {
				var val = item[key];
				if (!val) {
					item[key] = 'Libre'
				}
			}
		}
	})
}