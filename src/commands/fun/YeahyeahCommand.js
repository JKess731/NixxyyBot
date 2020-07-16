const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, MessageEmbed} = require('discord.js');

module.exports = class YeahyeahCommand extends BaseCommand {
  constructor() {
    super('yeahyeah', 'fun', []);
  }

  async run(client, message, args) {
    
    const yeahyeah1 = 'https://vm.tiktok.com/JNN159G/';
    const yeahyeah2 = 'https://vm.tiktok.com/JNNBNRq/';
    const yeahyeah3 = 'https://vm.tiktok.com/JNNapE7/';
    const yeahyeah4 = 'https://vm.tiktok.com/JNNapE7/';
    const yeahyeah5 = 'https://vm.tiktok.com/JN6LwAp/';
    const yeahyeah6 = 'https://vm.tiktok.com/JNjK8G1/';
    const yeahyeah7 = 'https://vm.tiktok.com/JNjpVQj/';

    let yeahyeahs = [yeahyeah1, yeahyeah2, yeahyeah3, yeahyeah4, yeahyeah5, yeahyeah6, yeahyeah7];
    var yeahyeahpick = yeahyeahs[Math.floor(Math.random() * yeahyeahs.length)];

    let titles = ["singing", "challenge", "yeahyeah"];
    var pick = titles[Math.floor(Math.random() * titles.length)];

    if(pick = "singing") {
    const singing = new MessageEmbed()
    .setColor(9577983)
    .setTitle('Ayo gahh, Singing Challenge!')
    .setDescription(yeahyeahpick)
    .setFooter('I love Nathan Davis Jr with my Heart and Soul');
    message.channel.send(singing);
   // message.channel.send(yeahyeahpick);
    }
  }
}