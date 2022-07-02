const { chromium } = require('playwright')
const websites = require('./websites')

console.log(websites)

console.log('Searching stock in online stores ...')
console.log('-------------------------------------')

const stores = websites.reduce((storeNames, website) => {
  if (storeNames.includes(website.name)) return storeNames
  return storeNames.concat(website.name)
}, [])

console.log(`\t* ${stores.join('\n\t* ')}`)

setInterval(async () => {
  const browser = await chromium.launch({ headless: false })

  for (const website of websites) {
    console.log(`Opening page: ${website.name}`)
    const context = await browser.newContext()
    try {
      const page = await context.newPage()
      await page.goto(website.url)
      const selector = await page.textContent(website.selector, {
        timeout: 5000,
      })
      if (selector.includes(website.content)) {
        console.log(`${website.name} HAS ${website.type} IN STOCK`)
        console.log(website.url)
      } else {
        throw new Error(
          `${website.name} DOES NOT HAVE ${website.type} IN STOCK`
        )
      }
    } catch (_) {
      console.log(`${website.type} OUT OF STOCK`)
    } finally {
      await context.close()
    }
  }

  await browser.close()
}, 1000 * 60) // every 10 minutes
