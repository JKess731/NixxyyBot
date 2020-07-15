const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =require('discord.js');

module.exports = class VidSuggestCommand extends BaseCommand {
  constructor() {
    super('vid-suggest', 'useful', ["vid-suggestion"]);
  }

  async run(client, message, args) {

    const upvote = client.emojis.cache.get("733047442991349860");
    const downvote = client.emojis.cache.get("733047442643222629");
    
    let suggestion = args.slice(0).join(" ");

    let channel = message.guild.channels.cache.find((x) => (x.id === "663180968705785867"));

    if (!channel){
       return message.channel.send('You may only make video suggestions in the #video-suggestions channel')
    }
    try {
    if (!suggestion){ 
      
    if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}vid-suggest`))
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
    .setTitle('🚨 New Video Suggestion 🚨')
    .setDescription(suggestion)
    .setTimestamp()
    .setColor(9577983)
    .setAuthor(`Suggestion by ${message.author.tag}`, message.author.displayAvatarURL())
    .setFooter('NixxyyBot')

    const msg = await channel.send(embed);
    await msg.react(upvote);
    await msg.react(downvote);
    // message.channel.send(embed);
    if (message.content.startsWith(`${process.env.DISCORD_BOT_PREFIX}vid-suggest`))
    message.delete();
    
    }
  }
}