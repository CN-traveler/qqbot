import glob from "glob";
import path from "path";
import { Client } from "oicq";
import config from "./config";

// 机器人初始化
export interface Plugin {
  name: string;
  version: string;
  init: (bot: Bot, config?: object | undefined) => void;
  exec?: (bot: Bot, config?: object | undefined) => void;
}

export class Bot extends Client {
  async register(pluginPath: string) {
    try {
      const { init, exec, name } = (await import(pluginPath)).default as Plugin;
      init(this, (<{ [key: string]: object | undefined }>config.plugin)[name]);
      if (exec) {
        bot.on("system.online", () => exec(this, (<{ [key: string]: object | undefined }>config.plugin)[name]));
      }
      bot.logger.info(`加载插件 ${pluginPath} 成功`);
    } catch {
      bot.logger.error(`加载插件 ${pluginPath} 失败`);
    }
  }
}

const bot = new Bot(config.bot.account);

// 加载插件
glob(`${__dirname.split(path.sep).join('/')}/plugin/*`, async (err, matches) => {
  for (let pluginPath of matches) {
    bot.register(pluginPath);
  }
  bot.login(config.bot.password);
});