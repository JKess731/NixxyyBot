const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const mongoose = require("mongoose");

// Connection to DB
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Data = require("../../models/data.js")

module.exports = class BalanceCommand extends BaseCommand {
  constructor() {
    super('balance', 'economy', ["bal", "money"]);
  }

  async run(client, message, args) {
    
    if(!args[0]) {
      var user = message.author;
    } else {
      var user = message.mentions.users.first() || client.users.cache.get(args[0]);
    }

    Data.findOne({
      userID: user.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newData = new Data({
          name: client.users.cache.get(user.id).username,
          userID: user.id,
          lb: "all",
          money: 120,
          daily: 0,
        })
        newData.save().catch(err => console.log(err));
      
        const embed = new MessageEmbed()
        .setDescription(`**${client.users.cache.get(user.id).username}** has a balance of **$120**`)
        .setColor(9577983)
        .setTimestamp()

        return message.channel.send(embed);
      } else {
        const embed2 = new MessageEmbed()
        .setDescription(`**${client.users.cache.get(user.id).username}** has a balance of **$${data.money}**`)
        .setColor(9577983)
        .setTimestamp()

        return message.channel.send(embed2);
      }
    })
  }
}