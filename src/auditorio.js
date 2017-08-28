var request = require('./request')

const reg = new RegExp(/Ext.data.PagingMemoryProxy\((\[\s*.*\s*\}\s*\]),\s*false/ig);

module.exports = function () {
	return new Promise((resolve, reject) => {
		request.get('http://chaira.udla.edu.co/Reservas/Views/Public/Salas.aspx?tipo=Auditorio').then(html => {
			var json_str = reg.exec(html)[1]
			var json = JSON.parse(json_str)
			return resolve(json)
		}).catch(reject)
	})
}