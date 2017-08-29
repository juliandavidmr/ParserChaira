var confs = require("./conferencia");
var salas = require("./sala");
var audit = require("./auditorio");

// confs().then(data => console.log("Conferencias:", JSON.stringify(data, null, 2)));
// salas().then(data => console.log("Salas:", JSON.stringify(data.length, null, 4)));
audit().then(data => console.log("Auditorios:", JSON.stringify(data, null, 4)));