const notifier = require('node-notifier')

/**
 * Notify the user if the website has stock
 * @param {{notify: boolean, name: string, type: string, url: string}} website - The website object
 * @param {string} [title] - The title of the notification
 */
function notify(website, title) {
  const { notify, name, type, url } = website
  title = title || 'Available stock!'
  if (notify) {
    notifier.notify({
      title,
      message: `${name} has ${type} on stock`,
      sound: true,
      open: url,
      wait: true,
      type: 'info',
    })
  }
}

module.exports = notify
