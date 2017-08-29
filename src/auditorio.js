var Request = require("./request");
var Util = require("./util");
var Json5 = require("json5");
const reg = new RegExp(/Ext.data.PagingMemoryProxy\((\[\s*.*\s*\}\s*\]),\s*false/ig);
const regColumns = new RegExp(/Ext.grid.ColumnModel\(\s*\{.*:(\[.*\])\}/ig);

module.exports = function() {
	return new Promise((resolve, reject) => {
		Request.get("http://chaira.udla.edu.co/Reservas/Views/Public/Salas.aspx?tipo=Auditorio").then(html => {
			// Datos
			var json = JSON.parse(reg.exec(html)[1]);
			Util.reemplaceNull(json);

			// Columnas
			var jsonCols = Json5.parse(regColumns.exec(html)[1]);
			jsonCols = jsonCols.slice(1, jsonCols.length);
			var res = {};

			jsonCols.map(k => res[k.dataIndex] = {
				recurso: k.header,
				reservas: []
			});

			json.map(item => {
				for (let key in item) {
					if (item.hasOwnProperty(key)) {
						const asignatura = item[key];

						if (res.hasOwnProperty(key)) {
							res[key].reservas.push({
								hora: item.Hora,
								asignatura
							});
						}
					}
				}
			});

			// conversion final
			var vec = [];
			for (let key in res) {
				if (res.hasOwnProperty(key)) {
					vec.push(res[key]);
				}
			}

			return resolve(vec);
		}).catch(reject);
	});
};