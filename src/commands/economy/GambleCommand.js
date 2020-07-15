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

module.exports = class GambleCommand extends BaseCommand {
  constructor() {
    super('gamble', 'economy', ["bet"]);
  }

  async run(client, message, args) {

    Data.findOne({
      userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      if(!data) {
        const newData = new Data({
          name: message.author.username,
          userID: message.author.id,
          lb: "all",
          money: 120,
          daily: 0,
        })
        newData.save().catch(err => console.log(err));

        const embed = new MessageEmbed()
        .setDescription(`😁 **Created User Profile** 😁`)
        .addField(`You had no money, So I gave you some!`, `Your Balance: **$${data.money}**`)
        .setColor(5046090)
        .setTimestamp()
    
        return message.channel.send(embed);
      } else {
        var maxBet = 10000;

        const noMoney = new MessageEmbed()
        .setDescription(`You don't have any money!`)
        .setColor(16730698)
        .setTimestamp()

        const noBet = new MessageEmbed()
        .setDescription(`You really wanna bet air? Cmon bet some money`)
        .setColor(16730698)
        .setTimestamp()

        const onlyWhole = new MessageEmbed()
        .setDescription(`You can only bet a whole amount`)
        .setColor(16730698)
        .setTimestamp()

        const lessMoney = new MessageEmbed()
        .setDescription(`You can't bet less than what you have`)
        .setColor(16730698)
        .setTimestamp()

        const maxiBet = new MessageEmbed()
        .setDescription(`You can only bet a maximum of $10,000`)
        .setColor(16730698)
        .setTimestamp()

        if(data.money <= 0) return message.channel.send(noMoney);

        if(!args[0]) return message.channel.send(noBet);

        if(args[0].toLowerCase() == "all") args[0] = data.money;

        if(args[0] == '0') return message.channel.send(noBet);

        try {
          var bet = parseFloat(args[0]);
        } catch {
          return message.channel.send(onlyWhole);
        }

        if(bet != Math.floor(bet)) return message.channel.send(onlyWhole);

        if(data.money < bet) return message.channel.send(lessMoney);

        if(bet > maxBet) return message.channel.send(maxiBet);

        let chances = ["win", "lose"];
        var pick = chances[Math.floor(Math.random() * chances.length)];

        if(pick == "lose") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose = new MessageEmbed()
        .setTitle(`${message.author.tag}`)
        .setDescription(`You lost!\nNew Balance: **${data.money}**`)
        .setColor(16730698)
        .setTimestamp()
          return message.channel.send(lose);
        } else {
          data.money += bet;
          data.save().catch(err => console.log(console.error()));
          const win = new MessageEmbed()
        .setTitle(`${message.author.tag}`)
        .setDescription(`You Won!\nNew Balance: **${data.money}**`)
        .setColor(5046090)
        .setTimestamp()
          return message.channel.send(win);
        }

      }
    })
  }
}