const Discord = require('discord.js')
// todo: refactor equipment category & add other categories
exports.createEquipmentMessage = item => {
  const embedMessage = new Discord.MessageEmbed()
  embedMessage
    .setColor('#39FF14')
    .setTitle(item.name)
    .setDescription(item.desc ? item.desc : '')
  if (item.equipment_category) {
    let properties = ''
    embedMessage.addField('Equipment Category', item.equipment_category, true)
    switch (item.equipment_category.toLowerCase()) {
      case 'armor':
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
        break
      case 'weapon':
        embedMessage.addField('Weapon Category', item.weapon_category, true)
        embedMessage.addField(
          'Reach (ft.)',
          `${item.range.normal}${item.range.long ? '/' + item.range.long : ''}`,
          true
        )
        if (item.throw_range) {
          embedMessage.addField(
            'Range (ft.)',
            `${item.throw_range.normal}/${item.throw_range.long}`,
            true
          )
        }
        embedMessage.addField(
          'Damage',
          `${item.damage.damage_dice}` +
          `+${item.damage.damage_bonus}` +
          ` ${item.damage.damage_type.name}`,
          true
        )
        item.properties.forEach(property => {
          properties += property.name + ' '
        })
        embedMessage.addField(
          'Properties',
          properties
        )
        break
      default:
        if (item.gear_category) { embedMessage.addField('Gear Category', item.gear_category, true) }
        if (item.cost) { embedMessage.addField('Cost', `${item.cost.quantity} ${item.cost.unit}`, true) }
        if (item.weight) { embedMessage.addField('Weight', item.weight, true) }
        break
    }
  }
  return embedMessage
}
