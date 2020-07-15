const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class BugreportsCommand extends BaseCommand {
  constructor() {
    super('bugreports', 'useful', ["bug", "bugs", "br"]);
  }

  async run(client, message, args) {

    let report = args.slice(0).join(" ");

    let channel = message.guild.channels.cache.find((x) => (x.id === "732790988032049243"));

    // const noChan = new MessageEmbed()
    // .setTitle('Please specify')
    try {
      if (!report){ 
        
      if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}bugreports` || `${process.env.DISCORD_BOT_PREFIX}bug` || `${process.env.DISCORD_BOT_PREFIX}bugs` || `${process.env.DISCORD_BOT_PREFIX}br`))
      message.delete({ timeout: 2000 });
  
        return message.channel.send('Please provide a Bug Report')
      .then(msg => {
        msg.delete({ timeout: 2500 })
      });
    }
    } catch(err) {
      console.log(err);
    }

    if (report) {
      const embed = new MessageEmbed()
      .setTitle('🚨 New NixxyBot Bug 🚨')
      .setDescription(report)
      .setTimestamp()
      .setColor(9577983)
      .setAuthor(`Bug Report by ${message.author.tag}`, message.author.displayAvatarURL())
      .setFooter('NixxyyBot')
  
      const msg = channel.send(embed);
      // message.channel.send(embed);
      if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}event-suggest`))
      message.delete();
      
      }
  }
}