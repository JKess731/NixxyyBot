const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =require('discord.js');
const packageJson = require('../../../package.json');

module.exports = class VersionCommand extends BaseCommand {
  constructor() {
    super('version', 'info', []);
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle('NixxyyBot | Version Panel')
    .setColor(9577983)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setDescription(`Version: ${packageJson.version}`)
    .setFooter(`Requested by ${message.author.username}`)
    message.channel.send(embed);
  }
}