import { Client, Message } from "whatsapp-web.js";

export function randomize(msg: Message, client: Client) {
    const words = msg.body.slice(11).split(' ');
    if (words.length > 1) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        msg.react('🟢');
        msg.reply(`🟢 *${randomWord}*`);
    } else {
        msg.reply('🔴 *Error*');
        msg.react('🔴');
    }
}