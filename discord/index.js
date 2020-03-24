const Discord = require('discord.js')
const equipment = require('../commands/equipment')

const client = new Discord.Client()

client.on('ready', () => {
  client.user.setActivity('Playing D&D 5e', { type: 'PLAYING' })
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  const prefix = message.content.substring(0, 1)
  if (prefix === '$') {
    const args = message.content.substring(1).toLowerCase().split(' ')
    const cmd = args[0]
    args.shift()
    switch (cmd) {
      case ('equipment'):
      case ('e'):
        equipment.getEquipment(message, args)
        break
      case ('ping'):
        message.reply(`Pong! \n HTTP Ping: ${new Date().getTime() - message.createdTimestamp} ms`)
        break
      default:
        message.reply('Invalid command.')
        break
    }
  }
})

client.login(process.env.BOT_TOKEN)

exports.client = client
