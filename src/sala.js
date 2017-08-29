var request = require('./request')

const reg = new RegExp(/Ext.data.PagingMemoryProxy\((\[\s*.*\s*\}\s*\]),\s*false/ig);

module.exports = function () {
	return new Promise((resolve, reject) => {
		request.get('http://chaira.udla.edu.co/Reservas/Views/Public/Salas.aspx?tipo=Sistemas').then(html => {
			var json = JSON.parse(reg.exec(html)[1])
			return resolve(json)
		}).catch(reject)
	})
}