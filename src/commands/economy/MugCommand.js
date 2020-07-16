const BaseCommand = require('../../utils/structures/BaseCommand');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const cooldown = new Set();

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Data = require("../../models/data.js");

module.exports = class MugCommand extends BaseCommand {
  constructor() {
    super('mug', 'economy', []);
  }

  async run(client, message, args) {

    if (cooldown.has(message.author.id)) {

      const oncooldown = new MessageEmbed()
      .setColor(16730698)
      .setTitle(`${message.author.tag} | 👮 Hey! Move along! `)
      .setDescription(`The police have their eye on you!\n\nPlease wait 30 minutes before mugging again!`)


      return message.channel.send(oncooldown)

    } else {
      const notFind = new MessageEmbed()
        .setDescription(`I could not find that player`)
        .setColor(16730698)
        .setTimestamp()

      const noYou = new MessageEmbed()
        .setDescription(`You cannot msg yourself`)
        .setColor(16730698)

      let user = message.mentions.members.first() || client.users.cache.get(args[0]);
      if (!user) return message.channel.send(notFind);

      if (user.id === message.author.id) return message.channel.send(noYou);
      Data.findOne({
        userID: message.author.id
      }, (err, authorData) => {
        if (err) console.log(err);
        if (!authorData) {

          const noRob = new MessageEmbed()
            .setDescription(`You cannot mug ${user.id}`)
            .setColor(16730698)
            .setTimestamp()

          return message.channel.send(noRob);
        } else {
          Data.findOne({
            userID: user.id
          }, (err, userData) => {
            if (err) console.log(err);

            if (!userData) {
              const newData = new Data({
                name: client.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: 120,
                daily: 0,
              })

              const noRob = new MessageEmbed()
                .setDescription(`You cannot mug ${user.id.username}`)
                .setColor(16730698)
                .setTimestamp()
              newData.save().catch(err => console.log(err));
              return message.channel.send(noRob);
            }

            var pick = Math = Math.random() * 100;
            // let chances = ["caught", "mugged"];
            // var pick = chances[Math.floor(Math.random() * chances.length)];

            function getRandomIntBetween(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let amount = getRandomIntBetween(1, userData.money / 2)

            const youmugged = new MessageEmbed()
              .setDescription(`**${message.author.username}** has mugged **${client.users.cache.get(user.id).username}** for **$${amount}**`)
              .setColor(5046090)
              .setTimestamp()


            if (pick > 25) {

              userData.money -= amount;
              authorData.money += amount;
              userData.save().catch(err => console.log(err));
              authorData.save().catch(err => console.log(err));

              message.channel.send(youmugged)

            }
            else if (pick <= 25) {

              let bail = getRandomIntBetween(1, 500)

              authorData.money -= bail;
              authorData.save().catch(err => console.log(err));
              const jail = new MessageEmbed()
                //16730698 - red
                //3579391 - blue
                .setTitle('👮 Your coming with us! 👮')
                .setDescription(`**${message.author.username}**, you have been caught by the police!\n\nYou paid a bail of **$${bail}**.`)
                .setColor(16730698)

              message.channel.send(jail);
            }
          })
        }
      })
    }
    

    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 1000 * 30 * 30)   

  }
}



          // const timer = setTimeout(()=>{ userCooldown[message.author.tag], clearTimeout(timer); }, 5000);

          // let userCooldown = {};

          //  if (userCooldown){
          //   const onmugdown2 = new MessageEmbed()
          //   .setDescription(`🚨 You cannot mug yet! Make sure you've waited 30 seconds`)
          //   .setColor(16730698)
          //   .setFooter(`${message.author.tag}`)
          //   return message.channel.send(onmugdown2);
          // } 



            // let mugCooldown = {};

            // const timer = setTimeout(()=>{  mugCooldown[message.author.id], clearTimeout(timer); }, 5000);

            // if (mugCooldown){
            //   const onmugdown2 = new MessageEmbed()
            //   .setDescription(`🚨 You cannot mug yet! Make sure you've waited 30 seconds`)
            //   .setColor(16730698)
            //   .setFooter(`${message.author.tag}`)
            //   return message.channel.send(onmugdown2);
            // }

    // let cooldownjail = injail.get(message.author.id);
    // let cooldownmug = mugused.get(message.author.id);
    // if (cooldownmug) {
    //   const remaining = Duration(cooldownmug - Date.now(), { units: ['h', 'm', 's'], round:true });
    //   const onmugdown = new MessageEmbed()
    //   .setDescription(`You have already mugged someone. Please wait ${remaining}`)
    //   .setColor(16730698)
    //   .setFooter(`${message.author.tag}`) 
    //   message.channel.send(onmugdown).catch((err) => console.log(err))
    // }
    //   else if (cooldownjail) {
    //   const remaining = Duration(cooldownjail - Date.now(), { units: ['h', 'm', 's'], round:true });
    //   const onjaildown = new MessageEmbed()
    //   .setDescription(`You have already mugged someone. Please wait ${remaining}`)
    //   .setColor(16730698)
    //   .setFooter(`${message.author.tag}`)
    //    message.channel.send(onjaildown).catch((err) => console.log(err));
    //   }