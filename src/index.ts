import { LocalAuth, Client } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import CommandHandler from "./commandHandler";

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersion: '2.2409.2',
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html'
  }
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('message_create', msg => {
  CommandHandler.handleCommand(msg, client);
});

client.on('message_revoke_everyone', (after, before) => {
  CommandHandler.removedMessage(after, before);
});

client.on('message_edit', (msg, edited, last) => {
  CommandHandler.editedMessage(msg, edited, last);
});

client.on("ready", () => {
  console.log("[+] HaloBot Running!");
});

client.initialize();