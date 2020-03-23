const fetch = require('node-fetch')
const embedMessage = require('../discord/embedMessage')

exports.getEquipment = async (message, args) => {
  let url = 'http://dnd5eapi.co/api/equipment/'
  for (let i = 0; i < args.length; i++) {
    url = url.concat(args[i])
    if (i !== args.length - 1) {
      url = url.concat('-')
    }
  }
  try {
    const response = await fetch(url)
    const result = await response.json()
    'error' in result ? message.channel.send(result.error) : message.channel.send(embedMessage.createEquipmentMessage(result))
  } catch (e) {
    console.log('Error:', e.message) // todo: remove
    message.channel.send('Item does not exist!')
  }
}
