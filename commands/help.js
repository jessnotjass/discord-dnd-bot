const embedMessage = require('../discord/embedMessage')

exports.getHelp = (message) => {
  message.author.send(embedMessage.createHelpMessage())
}
