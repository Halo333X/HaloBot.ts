import { Client, Message } from "whatsapp-web.js";

export function help(msg: Message, client: Client) {
    const commands = `*HaloBot* 🖥️
  /help 💮 *H̲e̲l̲p̲_C̲o̲m̲m̲a̲n̲d̲*
  /gpt ⏳ *A̲r̲t̲i̲f̲i̲c̲i̲a̲l̲_I̲n̲t̲e̲l̲l̲i̲g̲e̲n̲c̲e̲*
  /8ball 🎱 *Y̲e̲s̲_o̲r̲_n̲o̲*
  /randomize 🎲 *P̲i̲c̲k̲_b̲y̲_c̲h̲a̲n̲c̲e̲*
  /sticker 💟 *M̲a̲d̲e̲_s̲t̲i̲c̲k̲e̲r̲s̲*
  /music 🎧 *D̲o̲w̲n̲l̲o̲a̲d̲_M̲u̲s̲i̲c̲*
  /everyone 💨 *M̲e̲n̲t̲i̲o̲n̲_e̲v̲e̲r̲y̲o̲n̲e̲*
  /moonbase 🌒 *L̲i̲k̲e̲_G̲T̲T̲s̲*
  /write 🖼️ *T̲e̲x̲t̲_I̲n̲_M̲e̲d̲i̲a̲*
  /download 👀 *G̲e̲t̲_M̲e̲d̲i̲a̲*                         
  /math 🤓 *M̲a̲t̲h̲_I̲n̲t̲e̲r̲p̲r̲e̲t̲e̲r̲*`
    msg.react('💮');
    msg.reply(commands);
}

// /gtts 🔊 *T̲e̲x̲t̲_t̲o̲_s̲p̲e̲e̲c̲h̲*