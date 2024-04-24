import { GroupChat, Message, Contact, Client } from "whatsapp-web.js";

export async function everyone(msg: Message, client: Client) {
    msg.react('💨');
    const chat = await msg.getChat();
    if (chat.isGroup) {
        let text = "";
        let mentions: Contact[] = []; // Ahora es un array de cadenas
        const groupChat = chat as GroupChat;

        for (let participant of groupChat.participants) {
            let contact = await client.getContactById(participant.id._serialized);

            mentions.push(contact);
            text += `   〔 @${participant.id.user} 〕\n`;
        }
        msg.reply(`💨 Mencionando a todos!\n\n${text}`, undefined, { mentions });
    }
}