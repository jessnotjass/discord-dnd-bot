const Discord = require('discord.js')
const embedMessage = new Discord.MessageEmbed()
// todo: refactor equipment category & add other categories
exports.createEquipmentMessage = item => {
  embedMessage
    .setColor('#39FF14')
    .setTitle(item.name)
    .setDescription(item.desc ? item.desc : '')
  if (item.equipment_category) { embedMessage.addField('Equipment Category', item.equipment_category, true) }
  if (item.gear_category) { embedMessage.addField('Gear Category', item.gear_category, true) }
  if (item.armor_category) {
    embedMessage.addField('Armor Category', item.armor_category, true)
    if (item.armor_class) {
      embedMessage.addField(
        'AC',
        `${item.armor_class.base}` +
          `${item.armor_class.dex_bonus ? '+Dex Modifier' : ''}` +
          `${item.armor_class.max_bonus ? '(Max 2)' : ''}`,
        false
      )
    }
    if (item.str_minimum) { embedMessage.addField('Strength', item.str_minimum, true) }
    if (item.stealth_disadvantage) { embedMessage.addField('Stealth', 'Disadvantage', true) }
  }
  if (item.cost) { embedMessage.addField('Cost', `${item.cost.quantity} ${item.cost.unit}`, true) }
  if (item.weight) { embedMessage.addField('Weight', item.weight, true) }
  return embedMessage
}
