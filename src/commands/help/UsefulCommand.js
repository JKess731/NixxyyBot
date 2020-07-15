const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =require('discord.js');

const packageJson = require('../../../package.json');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('useful', 'help', []);
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle(`NixxyyBot | Useful Panel`)
    .setColor(9577983)
    .setAuthor(`${client.user.username} ${packageJson.version}`, client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`)
    .addFields(
      {name: "vid-suggestion", value: "`&vid-suggest <suggestion>`\nMake a video suggestion", inline:true},
      {name: "event-suggestion", value: "`&event-suggest <suggestion>`\nMake an event suggest", inline:true},
      {name: "version", value: "`&version`", infline:true}
      )
    message.channel.send(embed);
  }
}