const Discord = require('discord.js')
const equipment = require('../commands/equipment')
const dice = require('../commands/dice')

const client = new Discord.Client()
const prefix = '/'

client.on('ready', () => {
  client.user.setActivity('D&D 5e', { type: 'PLAYING' })
  console.log(`Logged in as ${client.user.tag}!`)
})
// todo: add command permission checks
client.on('message', message => {
  if (message.content.startsWith(prefix)) {
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
      case ('roll'):
      case ('r'):
        message.delete().catch()
        dice.roll(message, args)
        break
      default:
        message.reply('Invalid command.')
        break
    }
  }
})

client.login(process.env.BOT_TOKEN)

exports.client = client
