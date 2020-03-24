const getRollResult = (numberOfDice, sides) => {
  const values = []
  let total = 0
  let currentRoll = 0
  for (let i = 0; i < numberOfDice; i++) {
    currentRoll = Math.ceil(Math.random() * sides)
    values.push(currentRoll)
    total += currentRoll
  }
  return { values, total }
}

const getModifiedRollResult = (numberOfDice, sides) => {
  const roll1 = getRollResult(numberOfDice, sides)
  const roll2 = getRollResult(numberOfDice, sides)
  roll1.total > roll2.total ? roll1.advantage = true : roll2.advantage = true
  return { roll1, roll2 }
}

exports.roll = (message, args) => {
  const type = args[1]
  const dice = args[0].split('d')
  let [numberOfDice, sides] = dice
  let messageContent = `${message.author} :game_die:`

  if (numberOfDice === '') {
    numberOfDice = 1
  }

  if (type) {
    const { roll1, roll2 } = getModifiedRollResult(numberOfDice, sides)
    if (type === 'adv') {
      messageContent += `
        **Roll (${args[0]}) with Advantage:** ~~(${roll1.advantage ? roll2.values : roll1.values})~~ (${roll1.advantage ? roll1.values : roll2.values})
        **Total:** ${roll1.advantage ? roll1.total : roll2.total}
      `
    }
    if (type === 'dis') {
      messageContent += `
        **Roll (${args[0]}) with Disadvantage:** ~~(${roll1.advantage ? roll1.values : roll2.values})~~ (${roll1.advantage ? roll2.values : roll1.values})
        **Total:** ${roll1.advantage ? roll2.total : roll1.total}
      `
    }
  } else {
    const results = getRollResult(numberOfDice, sides)
    messageContent += `
      **Roll (${args[0]}):** ${results.values}
      **Total:** ${results.total}
    `
  }
  message.channel.send(messageContent)
}
