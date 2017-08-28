var conf = require('./conferencia')

conf().then(data => console.log("Conferencias:", data))