const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, MessageEmbed } = require('discord.js');
const ms = require('parse-ms');
const mongoose = require('mongoose');

// Connection to DB
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Data = require("../../models/data.js")

module.exports = class DailyCommand extends BaseCommand {
  constructor() {
    super('daily', 'economy', ['bonus']);
  }

  async run(client, message, args) {
  
    let timeout = 86400000;
    let reward = 250;

    Data.findOne({
      userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newData = new Data({
          name: message.author.username,
          userID: message.author.id,
          lb: "all",
          money: 370,
          daily: Date.now(),
        })
        newData.save().catch(err => console.log(err));
      
        const embed = new MessageEmbed()
        .setDescription(`😁 **You collected your daily reward**`)
        .addField(`You've collected your first reward!`, `Your Balance: **$370**`)
        .setColor(5046090)
        .setTimestamp()
    
        return message.channel.send(embed);
      } else {
        if(timeout - (Date.now() - data.daily) > 0) {
          
         // let time = ms(timeout - (Date.now() - data.daily));

         let time = ms(timeout - (Date.now() - data.daily));

          const alreadyEmbed = new MessageEmbed()
          .setColor(16730698)
          .setDescription(`😡 **You already collected your daily reward**`)
          .setTimestamp()
          .setFooter(`Come back in ${time.hours}h, ${time.minutes}m, ${time.seconds}s`)
          return message.channel.send(alreadyEmbed);
        } else {
          data.money += reward;
          data.daily = Date.now();
          data.save().catch(err => console.log(err));
          let time = ms(timeout - (Date.now() - data.daily));
          const collectedEmbed = new MessageEmbed()
          .setColor(5046090)
          .setDescription(`😁 **You collected your daily reward**`)
          .setTimestamp()
          .addField(`New Balance:`, `**$${data.money}**`)
          .setFooter(`Come back in ${time.hours}h, ${time.minutes}m, ${time.seconds}s`)
          return message.channel.send(collectedEmbed);
        }
      }
    })
    
    }

}