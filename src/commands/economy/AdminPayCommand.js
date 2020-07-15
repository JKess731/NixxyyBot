const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');

// Connection to DB
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Data = require("../../models/data.js");
const { MessageEmbed } = require('discord.js');

module.exports = class PayCommand extends BaseCommand {
  constructor() {
    super('adminpay', 'economy', ["ap"]);
  }

  run(client, message, args) {

    const notAdmin = new MessageEmbed()
        .setDescription(`You cannot Admin Pay`)
        .setColor(16730698)
        .setTimestamp()
    if (message.member.hasPermission("ADMINISTRATOR") || message.member.user.id === '249262664281358336') {
    

    const noBody = new MessageEmbed()
        .setDescription(`You need to choose someone to pay!`)
        .setColor(16730698)
        .setTimestamp()

        const notFind = new MessageEmbed()
        .setDescription(`I could not find that player`)
        .setColor(16730698)
        .setTimestamp()

        const noMoney = new MessageEmbed()
        .setDescription(`You have no money to send`)
        .setColor(16730698)
        .setTimestamp()

        const noSent = new MessageEmbed()
        .setDescription(`You really wanna send air?`)
        .setColor(16730698)
        .setTimestamp()

        const notEnough = new MessageEmbed()
        .setDescription(`You don't have that much money`)
        .setColor(16730698)
        .setTimestamp()

        const notOne = new MessageEmbed()
        .setDescription(`You cannot pay less than **$1**`)
        .setColor(16730698)
        .setTimestamp()

    let user = message.mentions.members.first() || client.users.cache.get(args[0]);
    if(!user) return message.channel.send(notFind);

    Data.findOne({
      userID: user.id,
    }, (err, userData) => {
      if(err) console.log(err);

      if (!args[1]) return message.channel.send(noSent);

      if(!userData) {
        const newData = new Data({
          name: client.users.cache.get(user.id).username,
          userID: user.id,
          lb: "all",
          money: parseInt(args[1] + 120),
          daily: 0,
        })
        newData.save().catch(err => console.log(err));
      } else {
        userData.money += parseInt(args[1]);
        userData.save().catch(err => console.log(err));
      }

      const send = new MessageEmbed()
      .setDescription(`**${message.author.username}** admin payed $${args[1]} to **${client.users.cache.get(user.id).username}**`)
      .setColor(16645888)
      .setTimestamp()

      return message.channel.send(send)
    })
  } else return message.channel.send(notAdmin);

  }
}
