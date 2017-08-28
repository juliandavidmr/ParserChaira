var request = require('request');

module.exports.get = (url) => {
	return new Promise((resolve, reject) => {
		request(url, function (error, response, body) {
			return error? reject(error) : resolve(body)			
		})
	})
}