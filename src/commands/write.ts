import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { createCanvas, loadImage } from "canvas";

export async function write(msg: Message, client: Client) {
    const text = msg.body.slice(6);
    if (msg.hasQuotedMsg) {
        try {
            msg.react(`💟`)
            const quotedMsg = await msg.getQuotedMessage();
            const img = await quotedMsg.downloadMedia();
            loadImage(Buffer.from(img.data, "base64")).then((image: any) => {
                const { width, height } = image;
                const canvas = createCanvas(width, height + 100);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 100, width, height);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, 100);
                
                // Calcular el tamaño de la fuente basado en la longitud del texto y el ancho de la imagen
                let fontSizeBase = 60;
                const numOfLetters = text.length;
                if (width < 400) {
                    fontSizeBase -= 1.2 * numOfLetters;
                } else {
                    fontSizeBase -= numOfLetters;
                }
                ctx.font = `${fontSizeBase}px Arial`;
                const textMetrics = ctx.measureText(text);
                const centerX = (canvas.width - textMetrics.width) / 2;
                ctx.fillStyle = 'black';
                ctx.fillText(text, centerX, 70);

                const result = canvas.toBuffer('image/jpeg').toString('base64');
                const media = new MessageMedia('image/jpeg', result, 'meme.jpeg');
                msg.reply(media);
                msg.react('✅');
            }).catch((err: any) => {
                msg.reply('⛔ *Debe contener mínimo una imagen!*');
            });
        } catch {
            msg.reply('⛔ *Debe contener mínimo una imagen!*');
            msg.react('⛔');
        }
    } else if (msg.hasMedia) {
        try {
            msg.react(`💟`)
            const img = await msg.downloadMedia();
            loadImage(Buffer.from(img.data, "base64")).then((image: any) => {
                const { width, height } = image;
                const canvas = createCanvas(width, height + 100);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 100, width, height);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, 100);
                
                // Calcular el tamaño de la fuente basado en la longitud del texto y el ancho de la imagen
                let fontSizeBase = 60;
                const numOfLetters = text.length;
                if (width < 400) {
                    fontSizeBase -= 1.2 * numOfLetters;
                } else {
                    fontSizeBase -= numOfLetters;
                }
                
                ctx.font = `${fontSizeBase}px Arial`;
                const textMetrics = ctx.measureText(text);
                const centerX = (canvas.width - textMetrics.width) / 2;
                ctx.fillStyle = 'black';
                ctx.fillText(text, centerX, 70);

                const result = canvas.toBuffer('image/jpeg').toString('base64');
                const media = new MessageMedia('image/jpeg', result, 'meme.jpeg');
                msg.reply(media);
                msg.react('✅');
            }).catch((err: any) => {
                msg.reply('⛔ *Debe contener mínimo una imagen!*');
            });
        } catch {
            msg.reply('⛔ *Debe contener mínimo una imagen!*');
            msg.react('⛔');
        }
    }
}
