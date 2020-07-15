const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =require('discord.js');

module.exports = class EventSuggestCommand extends BaseCommand {
  constructor() {
    super('event-suggest', 'useful', []);
  }

  async run(client, message, args) {
    
    let suggestion = args.slice(0).join(" ");

    let channel = message.guild.channels.cache.find((x) => (x.id === "548167031480909824"));

    if (!channel){
       return message.channel.send('You may only make event suggestions in the #event-suggestions channel')
    }
    try {
    if (!suggestion){ 
      
    if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}event-suggest`))
    message.delete({ timeout: 2000 });

      return message.channel.send('Please provide a suggestion')
    .then(msg => {
      msg.delete({ timeout: 2500 })
    });
  }
  } catch(err) {
    console.log(err);
  }
  if (suggestion) {
    const embed = new MessageEmbed()
    .setTitle('🚨 New Event Suggestion 🚨')
    .setDescription(suggestion)
    .setTimestamp()
    .setColor(9577983)
    .setAuthor(`Suggestion by ${message.author.tag}`, message.author.displayAvatarURL())
    .setFooter('NixxyyBot')

    const msg = await channel.send(embed);
    await msg.react('✅');
    await msg.react('❌');
    // message.channel.send(embed);
    if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}event-suggest`))
    message.delete();
    
    }
  }
}