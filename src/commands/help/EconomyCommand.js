const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =require('discord.js');

const packageJson = require('../../../package.json');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('economy', 'help', []);
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
    .setTitle(`NixxyyBot | Economy Panel`)
    .setColor(9577983)
    .setAuthor(`${client.user.username} ${packageJson.version}`, client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`)
    .addFields(
      {name: "money", value: "`&money/balance/bal`\nShow your balance, or that of another", inline:true},
      {name: "daily reward", value: "`&daily/bonus`\nCollect your daily bonus", inline:true},
      {name: "gamble", value: "`&gamble <bet>`\nGamble money!", inline:true},
      {name: "slots", value: "`&slots <bet>`\nGamble money in Slots!", inline:true},
      {name: "pay", value: "`&pay/send <user> <amount>`\nSend money to a User!", inline:true},
      {name: "weekly reward", value: "`&weekly/Wbonus`\nCollect your weekly bonus", inline:true},
      {name: "Admin Pay", value: "`&adminpay/ap <user> <amount>`\nRequires ADMINISTRATOR permissions. Give someone money", inline:true},
      {name: "Leaderboard", value: "`&leaderboard/lb | &leaderboard/lb <page>`\nShow who has the most money!", inline:true}
      )
    message.channel.send(embed);
  }
}