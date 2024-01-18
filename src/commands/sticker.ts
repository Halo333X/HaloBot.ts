import { Client, Message } from "whatsapp-web.js";

export async function sticker(msg: Message, client: Client) {
    if (msg.hasQuotedMsg) {
        msg.react(`💟`)
        const quotedMsg = await msg.getQuotedMessage();
        const sticker = await quotedMsg.downloadMedia();
        msg.reply(sticker, undefined, { sendMediaAsSticker: true, stickerAuthor: "HaloBot", stickerName: "idk", stickerCategories: ["HaloBot"] })
        msg.react('🟢');
    }
    else if (msg.hasMedia) {
        msg.react(`💟`)
        const sticker = await msg.downloadMedia();
        msg.reply(sticker, undefined, { sendMediaAsSticker: true, stickerAuthor: "HaloBot", stickerName: "idk", stickerCategories: ["HaloBot"] })
        msg.react('🟢');
    }
}