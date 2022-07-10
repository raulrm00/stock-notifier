const colors = require('colors/safe')
const websites = require('./websites')
const app = require('./lib/app')

console.log(websites)
console.log()

console.log('Searching stock in online stores ...')
console.log('-------------------------------------')

const stores = websites.reduce((storeNames, website) => {
  if (storeNames.includes(website.name)) return storeNames
  return storeNames.concat(website.name)
}, [])

console.log(`${colors.blue('\t*')} ${stores.join(colors.blue('\n\t* '))}`)
console.log()

app(websites)

setInterval(async () => app(websites), 1000 * 60 * 10) // every 10 minutes
