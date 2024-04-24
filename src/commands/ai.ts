import { Client, Message } from "whatsapp-web.js";
import * as account from "../huggingChatAccount.json";

export async function AI(msg: Message, client: Client) {
    try {
        msg.react('⚜️');
        const { Login, ChatBot } = await import('huggingface-chat');
        const EMAIL = account.email;
        const PASSWD = account.password;
        const cachePath = "../login_cache/";
        const signin = new Login(EMAIL, PASSWD);
        const res = await signin.login(cachePath);
        const chat = new ChatBot(res);
        await chat.intialize();
        const data = await chat.chat(msg.body);
        const response = await data.completeResponsePromise();
        msg.reply('⚜️ AI: ' + response);
    } catch (error) {
        console.error(error);
        msg.reply('🔴 An error have ocurred, try again or later.');
        msg.react('🔴');
    }
}