var request = require('./request')
var util = require('./util')
var JSON5 = require('json5')

const reg = new RegExp(/Ext.data.PagingMemoryProxy\((\[\s*.*\s*\}\s*\]),\s*false/ig);
const regColumns = new RegExp(/Ext.grid.ColumnModel\(\s*\{.*:(\[.*\])\}/ig);

module.exports = function () {
	return new Promise((resolve, reject) => {
		request.get('http://chaira.udla.edu.co/Reservas/Views/Public/Salas.aspx?tipo=Conferencia').then(html => {
			// Datos
			var json = JSON.parse(reg.exec(html)[1])
			util.reemplaceNull(json)

			// Columnas
			var jsonCols = JSON5.parse(regColumns.exec(html)[1])
			jsonCols = jsonCols.slice(1, jsonCols.length)

			var res = {}
			jsonCols.map(k => res[k.dataIndex] = {
				recurso: k.header,
				reservas: []
			})

			json.map(item => {
				for (var key in item) {
					if (item.hasOwnProperty(key)) {
						var asignatura = item[key];

						if (res.hasOwnProperty(key)) {
							res[key].reservas.push({
								hora: item.Hora,
								asignatura
							})
						}
					}
				}
				// console.log(res)
			})

			// conversion final
			var vec = []
			for (var key in res) {
				vec.push(res[key])
			}

			return resolve(vec)
		}).catch(reject)
	})
}