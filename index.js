require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  const prefix = message.content.substring(0, 1)
  if (prefix === '$') {
    const args = message.content.substring(1).split(' ')
    const cmd = args[0]
    switch (cmd) {
      case ('ping'):
        message.reply(`Pong! \n HTTPS Ping: ${new Date().getTime() - message.createdTimestamp} ms`)
        break
      default:
        message.reply('Invalid command.')
        break
    }
  }
})

client.login(process.env.BOT_TOKEN)
