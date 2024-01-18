import { Client, Message } from "whatsapp-web.js";
import { account } from "../huggingChatAccount";

export async function gpt(msg: Message, client: Client) {
    const EMAIL = account[0];
    const PASSWD = account[1];
    const cachePath = "./login_cache/";
    msg.react('⌛');

    const { Login, ChatBot } = await import("huggingface-chat");
    
    const signin = new Login(EMAIL, PASSWD);
    const res = await signin.login(cachePath);
    const chat = new ChatBot(res);
    const userTxt = msg.body.replace('/gpt ', '');
    const data = await chat.chat(userTxt);
    const response = await data.completeResponsePromise();
    msg.reply('🍂 *ChatGPT:* ' + response);
    msg.react('🍂');
}
