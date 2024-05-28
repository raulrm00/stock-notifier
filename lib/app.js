const colors = require('colors/safe')
const { chromium } = require('playwright')
const notify = require('./notifier')

async function app(settings) {
  const { items, enableNotifications } = settings
  const browser = await chromium.launch()

  for (const item of items) {
    const { name, url, selector, content, type } = item
    console.log(`Opening page: ${name}`)
    const context = await browser.newContext()
    try {
      const page = await context.newPage()
      await page.goto(url)
      await page.reload({ waitUntil: 'domcontentloaded' })
      const textContent = await page.textContent(selector, {
        timeout: 5000,
      })
      if (textContent.includes(content)) {
        console.log(`${type} ${colors.brightGreen('AVAILABLE STOCK')}`)
        console.log(colors.underline(url))
        enableNotifications && notify(item) // Notify the user via desktop notification
      } else {
        throw new Error(`${name} DOES NOT HAVE ${type} IN STOCK`)
      }
    } catch (_) {
      console.log(`${type} ${colors.red('OUT OF STOCK')}`)
    } finally {
      await context.close()
      console.log()
    }
  }

  await browser.close()
}

module.exports = app
