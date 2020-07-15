const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    const activities = [ `&help | NixyyBot`, `${client.users.cache.size} Users!`, `Nixx on YouTube`];

    setInterval(() => {
      let activity = activities[Math.floor(Math.random() * activities.length)]
      client.user.setActivity(activity, { type: "WATCHING" })
    }, 60000)
  }
}