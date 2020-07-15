const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

const packageJson = require('../../../package.json');

module.exports = class FunCommand extends BaseCommand {
  constructor() {
    super('fun', 'help', []);
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle(`NixxyyBot | Fun Panel`)
    .setColor(9577983)
    .setAuthor(`${client.user.username} ${packageJson.version}`, client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`)
    .addFields(
      {name: "Yeah Yeah", value: "`&yeahyeah`\nShow your support for Nathan Davis Jr", inline:true},
      )
    message.channel.send(embed);
  }
}