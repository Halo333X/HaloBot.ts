import { Client, Message } from "whatsapp-web.js";
import { _8ball } from "./commands/8ball";
import { download } from "./commands/download";
import { everyone } from "./commands/everyone";
import { help } from "./commands/help";
import { math } from "./commands/math";
import { write } from "./commands/write";
import { moonbase } from "./commands/moonbase";
import { sticker } from "./commands/sticker";
import { randomize } from "./commands/randomize";
import { music } from "./commands/music";
import { gpt } from "./commands/gpt";
import { getDeletedMessage } from "./commands/getDeletedMessage";

export class CommandHandler {
  private commands: { [key: string]: (msg: Message, client: Client) => void };

  constructor() {
    this.commands = {
      "/8ball": _8ball,
      "/download": download,
      "/everyone": everyone,
      "/help": help,
      "/math": math,
      "/write": write,
      "/moonbase": moonbase,
      "/sticker": sticker,
      "/randomize": randomize,
      "/music": music,
      "/gpt": gpt
    };
  }

  handleCommand(msg: Message, client: Client) {
    const commandKey = `${msg.body.split(' ')[0]}`;
    const key = Object.keys(this.commands).find(e => e === commandKey);
    if (msg.body.startsWith("/") && key) this.commands[commandKey](msg, client);
    else {
      if (!msg.body.startsWith('/')) return;
      msg.reply('🔴 *Invalid command!*\n🔵 *Try using /help*');
      msg.react('🔴');
    }
  }
  removedMessage(after: Message, before: Message | undefined | null) {
    getDeletedMessage(after, before)
  }
}
export default new CommandHandler();