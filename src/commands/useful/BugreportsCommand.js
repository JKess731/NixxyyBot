const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class BugreportsCommand extends BaseCommand {
  constructor() {
    super('bugreports', 'useful', ["bug", "bugs", "br"]);
  }

  async run(client, message, args) {

    let report = args.slice(0).join(" ");

    let channel = client.guilds.cache.get("730962788083564628").channels.cache.get("732790988032049243");

    // const noChan = new MessageEmbed()
    // .setTitle('Please specify')
    try {
      if (!report){ 
        
      if (message.content.startsWith(`&bugreports` || `&bug` || `&bugs` || `&br`))
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
      .setColor(16645888)
      .setAuthor(`Bug Report by ${message.author.tag}`, message.author.displayAvatarURL())
      .setFooter('NixxyyBot')

      const sentEmbed = new MessageEmbed()
      .setTitle('Bug report Sent')
      .setTimestamp()
      .setColor(5046090)
      .setFooter(`Bug Report by ${message.author.tag}`, message.author.displayAvatarURL())
  
      const msg = channel.send(embed);
      message.channel.send(sentEmbed);
      // message.channel.send(embed);
      if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}event-suggest`))
      message.delete();
      
      }
  }
}