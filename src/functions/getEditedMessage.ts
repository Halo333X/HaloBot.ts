import { Message } from "whatsapp-web.js";

let active = true;

export function getEditedMessage(msg: Message, edited: String, last: String) {
    if (active) {
        msg.reply(`🔵 Previous Message: ` + last + `\n` + `🟢 New Message: ` + edited);
        msg.react('🔵');
    }
}