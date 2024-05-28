const settings = require('./settings')
const app = require('./lib/app')

const { interval, items } = settings

function main() {
  console.clear()
  console.table(items, ['type', 'name', 'url'])
  console.log()
  app(settings)
}

setInterval(async () => main(), 1000 * interval)

main()
