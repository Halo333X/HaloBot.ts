import { Client, Message } from "whatsapp-web.js";

export function math(msg: Message, client: Client) {
    const mathExpression = msg.body.replace('/math ', '');
    try {
        msg.react('🖥️');
        const result = eval(mathExpression);
        msg.reply(`🟢 *${mathExpression} = ${result}*`);
        msg.react('🟢');
    } 
    catch (e) {
        msg.reply(`🔴 *NaN*`);
        msg.react('🔴');
    }
}