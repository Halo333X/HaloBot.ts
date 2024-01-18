import { Message } from "whatsapp-web.js";

let active = true;

export function getDeletedMessage(after: Message, before: Message | undefined | null) {
    if (before && active) {
        after.reply('🔵 *Deleted Message*\n ✉️ *Content*: ' + `*${before.body}*`);
    }
}