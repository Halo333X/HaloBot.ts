import { Client, Message } from "whatsapp-web.js";

export async function we(msg: Message, client: Client) {
    for (let i = 0; i <= 100; i++) {
        msg.reply(i + ') We 🦆')
    }
}