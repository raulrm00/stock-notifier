const colors = require('colors/safe')
const websites = require('./websites')
const app = require('./lib/app')

console.table(websites, ['type', 'name', 'url'])
console.log()

app(websites)

setInterval(async () => app(websites), 1000 * 60 * 5) // every 5 minutes
