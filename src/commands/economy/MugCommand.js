const BaseCommand = require('../../utils/structures/BaseCommand');
const { set } = require('mongoose');
const prefix = (process.env.DISCORD_BOT_PREFIX)

module.exports = class MugCommand extends BaseCommand {
  constructor() {
    super('mug', 'economy', []);
  }

  async run(client, message, args) {
    
  //   const caughtPolice = new set();

  //   let args = message.content.substring(prefix.length).split(" ");



  //   switch(args[0]){
  //     case 'mug':
  //       if (caughtPolice.has(message.author.id)) {

  //       }
  //   }

   }
}