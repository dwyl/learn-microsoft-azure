var fs = require('fs');
var lines = fs.readFileSync(__dirname + '/tables.txt').toString().trim();
console.log(lines);
