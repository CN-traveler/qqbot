import { Bot, Plugin } from "../..";

const plugin: Plugin = {
  name: "max",
  version: "0.0.1",
  init: (bot: Bot, config?: object | undefined) => {
    bot.on("message.group.normal", (message) => {
      const target = /^max ([\d]+) ([\d]+)$/g;
      if (target.test(message.raw_message)) {
        message.raw_message.replace(target, (str: string, v1: string, v2: string) => {
          message.reply(Number(v1) > Number(v2) ? v1 : v2, true);
          return str;
        });
      }
    })
  }
}

export default plugin;