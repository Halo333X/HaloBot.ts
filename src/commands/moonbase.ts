import { Client, Message, MessageMedia } from "whatsapp-web.js";
import axios from "axios";

export async function moonbase(msg: Message, client: Client) {
    msg.react('🌒')
    const text = msg.body.slice(9)
    const { data } = await axios.get('http://tts.cyzon.us/tts?text=' + text, {
        responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(data, 'binary');
    const base64Data = buffer.toString('base64');
    const media = new MessageMedia("audio/mp4", base64Data, 'moonbase.mp3');
    msg.reply(media, undefined, { sendMediaAsDocument: true, caption: "Examples of moonbase: https://steamcommunity.com/sharedfiles/filedetails/?id=919364352" });
    msg.react('🟢');
}