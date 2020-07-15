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

module.exports = class SlotsCommand extends BaseCommand {
  constructor() {
    super('slots', 'economy', []);
  }

 async run(client, message, args) {

    function emoji (id) {
      return client.emojis.cache.get(id).toString ();
    }

    const seven = client.emojis.cache.get("732754615095001128");
    const diamond = client.emojis.cache.get("732754614759325777");
    const melon = client.emojis.cache.get("732755197713186986");
    const bell = client.emojis.cache.get("732754614721708133");
    const horseshoe = client.emojis.cache.get("732754615459643463");
    const lemon = client.emojis.cache.get("732754615577346089");
    const cherry = client.emojis.cache.get("732754767746695179");
    const heart = client.emojis.cache.get("732754614927097886");
    const bar = client.emojis.cache.get("732754942237868043");

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

        let chances = ["lose", "lose2", "lose3", "lose4", "lose5", "lose6", "lose7", "jackpot", "diamonds", "melons", "bar"];
        var pick = chances[Math.floor(Math.random() * chances.length)];

        let item = [seven, diamond, melon, bell, horseshoe, lemon, cherry, heart, bar];
        let random = item[Math.floor(Math.random() * item.length)];
        let random2 = item[Math.floor(Math.random() * item.length)];
        let random3 = item[Math.floor(Math.random() * item.length)];
        let random4 = item[Math.floor(Math.random() * item.length)];
        let random5 = item[Math.floor(Math.random() * item.length)];
        let random6 = item[Math.floor(Math.random() * item.length)];

        const jackpot = new MessageEmbed()
        .setFooter(`${message.author.tag}`)
        .setTitle(`🤩 JACKPOT 🤩`)
        .setDescription(`${random} ${random2} ${random3}\n${seven} ${seven} ${seven}\n${random4} ${random5} ${random6}`)
        .setColor(7929674)


        if(pick == "jackpot") {
          data.money = data.money + bet * 5;
          data.save().catch(err => console.log(console.error()));
          const jackpot = new MessageEmbed()
        .setFooter(`${message.author.tag} (x5)`)
        .setTitle(`🤩 JACKPOT 🤩`)
        .setDescription(`${random} ${random2} ${random3}\n${seven} ${seven} ${seven}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(7929674)
        return message.channel.send(jackpot);
        } else if (pick == "diamonds") {
          data.money = data.money + bet * 2;
          data.save().catch(err => console.log(console.error()));
          const diamonds = new MessageEmbed()
        .setFooter(`${message.author.tag} (x2)`)
        .setTitle(`2️⃣ DOUBLE BET 2️⃣`)
        .setDescription(`${random} ${random2} ${random3}\n${diamond} ${diamond} ${diamond}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(7929674)
        return message.channel.send(diamonds)
        } else if (pick == "melons") {
          data.money = data.money + 15;
          data.save().catch(err => console.log(console.error()));
          const melons = new MessageEmbed()
        .setFooter(`${message.author.tag} (+15)`)
        .setTitle(`🤩 JACKPOT 🤩`)
        .setDescription(`${random} ${random2} ${random3}\n${melon} ${melon} ${melon}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(7929674)
        return message.channel.send(melons)
        } else if (pick == "bar") {
          data.money = data.money + 5;
          data.save().catch(err => console.log(console.error()));
          const bar2 = new MessageEmbed()
        .setFooter(`${message.author.tag} (+5)`)
        .setTitle(`🤩 JACKPOT 🤩`)
        .setDescription(`${random} ${random2} ${random3}\n${bar} ${bar} ${bar}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(7929674)
        return message.channel.send(bar2)
        }

        if(pick == "lose") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose = new MessageEmbed()
          .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random2} ${random6} ${random3}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose);
        } else if(pick == "lose2") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose2 = new MessageEmbed()
          .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random} ${random4} ${random3}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose2);
        } else if(pick == "lose3") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose3 = new MessageEmbed()
          .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random4} ${random6} ${random}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose3);
        } else if(pick == "lose4") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose4 = new MessageEmbed()
          .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random3} ${random2} ${random3}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose4);
        } else if(pick == "lose5") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose5 = new MessageEmbed()
          .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random4} ${random} ${random3}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose5);
        } else if(pick == "lose6") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose6 = new MessageEmbed()
          .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random} ${random2} ${random5}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose6);
        } else if(pick == "lose7") {
          data.money -= bet;
          data.save().catch(err => console.log(console.error()));
          const lose7 = new MessageEmbed()
        .setFooter(`${message.author.tag}`)
        .setDescription(`${random} ${random2} ${random3}\n${random} ${random2} ${random5}\n${random4} ${random5} ${random6}\n\nNew Balance: **$${data.money}**`)
        .setColor(16730698)
          return message.channel.send(lose7);
        }
      }
    })
  }
}