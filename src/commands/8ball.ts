import { Client, Message } from "whatsapp-web.js";

export function _8ball(msg: Message, client: Client) {
    const the8ball: string[] = [
        "🎱 *Maybe no.*", "🎱 *No...*",
        "🎱 *Sure :D.*", "🎱 *I'm having lag, ask again.*",
        "🎱 *Yes <3.*", "🎱 *Theoretically, yes.*",
        "🎱 *Theoretically, no.*", "🎱 *Maybe o.o.*",
        "🎱 *idk.*", "🎱 *Ask me something else, okay?*",
        "🎱 *Yes n.n*", "🎱 *No n.n*",
        "🎱 *Obviously no.*", "🎱 *I have the same opinion*",
        "🎱 *OF COURSE NO!*", "🎱 *...*"
    ];
    msg.react('🎱');
    const randomize8ball = the8ball[Math.floor(Math.random() * the8ball.length)];
    msg.reply(randomize8ball);
}