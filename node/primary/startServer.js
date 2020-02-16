const server = require('./server1')
const route = require('./route')

server(route)

console.log(__dirname)
console.log(__filename)