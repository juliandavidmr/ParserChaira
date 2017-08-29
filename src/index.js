var confs = require('./conferencia')
var salas = require('./sala')
var audit = require('./auditorio')

confs().then(data => console.log("Conferencias:", JSON.stringify(data, null, 2)))
// salas().then(data => console.log("Salas:", data.length))
// audit().then(data => console.log("Auditorios:", data.length))