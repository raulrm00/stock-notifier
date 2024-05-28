const notifier = require('node-notifier')

/**
 * Notify the user if the item has stock
 * @param {{notify: boolean, name: string, type: string, url: string}} item - The item object
 * @param {string} [title] - The title of the notification
 */
function notify(item, title) {
  const { notify, name, type, url } = item
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
