const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =require('discord.js');

const packageJson = require('../../../package.json');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'help', []);
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle(`NixxyyBot | Help Panel`)
    .setColor(9577983)
    .setAuthor(`${client.user.username} ${packageJson.version}`, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`)
    .setDescription('The Bot prefix is `&`')
    .addField('`Help`', '&help', true)
    .addField('`Useful`', '&useful', true)
    //.addField('`General`', '&general', true)
    //.addField('`Fun`', '&fun', true)
    .addField('`Economy`', '&economy', true)
    message.channel.send(embed);
  }
}