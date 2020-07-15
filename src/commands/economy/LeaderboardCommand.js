const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

// Connection to DB
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Data = require("../../models/data.js");

module.exports = class LeaderboardCommand extends BaseCommand {
  constructor() {
    super('leaderboard', 'economy', ["lb"]);
  }

  async run(client, message, args) {
    
    Data.find({
      lb: "all"
    }).sort([
      ['money', 'descending']
    ]).exec((err, res) => {
      if (err) console.log(err);

      var page = Math.ceil(res.length / 5)
      
      let embed = new MessageEmbed();
      embed.setTitle("NixxyyBot | Leaderboard");
      embed.setColor(9577983);
      embed.setThumbnail('https://i.imgur.com/Lo6OAKi.png[/img]');

      let pg = parseInt(args[0]);
      if(pg != Math.floor(pg)) pg = 1;
      if(!pg) pg = 1;
      let end = pg * 5;
      let start = (pg * 5) - 5;

      if(res.length === 0) {
        embed.addField("Error", 'No Pages found', true);
      } else if (res.length <= start) {
        embed.addField("Error", 'Page Not Found', true);
      } else if (res.length <= end) {
        embed.setFooter(`page ${pg} of ${page}`);
        for(let i = start; i < res.length; i++) {
          embed.addField(`${i + 1}. ${res[i].name}`, `$${res[i].money.toLocaleString()}`);
        }

      } else {
        embed.setFooter(`page ${pg} of ${page}`);
        for(let i = start; i < end; i++) {
          embed.addField(`${i + 1}. ${res[i].name}`, `$${res[i].money.toLocaleString()}`);
        }
      }
      message.channel.send(embed);
    })

  }
}