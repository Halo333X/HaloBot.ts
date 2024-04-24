import { Client, Message } from "whatsapp-web.js";

export async function download(msg: Message, client: Client) {
    if (msg.hasQuotedMsg) {
        msg.react(`💟`);
        const quotedMsg = await msg.getQuotedMessage();
        const media = await quotedMsg.downloadMedia();
        msg.reply(media);
        msg.react('🟢');
    }
    else {
        msg.reply('🔴 No hay imagen')
    }
}