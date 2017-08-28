var request = require('request');

module.exports.get = (url) => {
	return new Promise((resolve, reject) =>
		request(url, (error, response, body) => error ? reject(error) : resolve(body))
	)
}