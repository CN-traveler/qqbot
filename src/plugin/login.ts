import { Bot, Plugin } from "..";

const plugin: Plugin = {
  name: "login",
  version: "0.0.1",
  init: (bot: Bot, config?: object | undefined) => {
    bot.on("system.login.qrcode", () => {
      bot.logger.info(`扫码后按 Enter 完成登录`);
      process.stdin.once("data", () => bot.login());
    });
    bot.on("system.login.slider", () => {
      bot.logger.info("输入 ticket");
      process.stdin.once("data", ticket => bot.submitSlider(String(ticket).trim()));
    });
    bot.on("system.login.device", () => {
      bot.sendSmsCode();
      bot.logger.info("输入 code");
      process.stdin.once("data", code => bot.submitSmsCode(String(code).trim()));
    })
  }
}

export default plugin;