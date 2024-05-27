const colors = require('colors/safe')
const { chromium } = require('playwright')
const notify = require('./notifier')

async function app(websites) {
  const browser = await chromium.launch()

  for (const website of websites) {
    console.log(`Opening page: ${website.name}`)
    const context = await browser.newContext()
    try {
      const page = await context.newPage()
      await page.goto(website.url)
      await page.reload({ waitUntil: 'domcontentloaded' })
      const selector = await page.textContent(website.selector, {
        timeout: 5000,
      })
      if (selector.includes(website.content)) {
        console.log(`${website.type} ${colors.brightGreen('AVAILABLE STOCK')}`)
        console.log(colors.underline(website.url))
        notify(website) // Notify the user via desktop notification
      } else {
        throw new Error(
          `${website.name} DOES NOT HAVE ${website.type} IN STOCK`
        )
      }
    } catch (_) {
      console.log(`${website.type} ${colors.red('OUT OF STOCK')}`)
    } finally {
      await context.close()
      console.log()
    }
  }

  await browser.close()
}

module.exports = app
